import { useEffect, useRef, useState } from 'react'
import '../components/Admin/Admin.css'
import {
  treatments,
  branches,
  getBranchArea,
  adminStatuses,
  adminSessionKey,
  getTodayDateValue,
  postBookingEndpoint,
  fetchAdminSupportChats,
  sendAdminSupportMessage,
  getStoredAdminSession,
  getDefaultAdminFilters,
  getCompletedDateParts,
} from '../config/siteContent.js'

const isGenericFetchFailure = (error) => error.message.toLowerCase() === 'failed to fetch'
const clinicPaymentStatuses = ['Payment due at clinic', 'Collected at clinic']

const getBookingPaymentMode = (booking) => {
  const method = String(booking.paymentMethod || '').toLowerCase()
  const status = String(booking.paymentStatus || '').toLowerCase()

  if (method.includes('pay at clinic') || status.includes('clinic')) {
    return 'clinic'
  }

  return 'online'
}

const getBookingPaymentAmount = (booking) => {
  const amount = Number(booking.paymentAmount)

  return Number.isFinite(amount) && amount > 0 ? amount : ''
}

export function AdminDashboard() {
  const [session, setSession] = useState(getStoredAdminSession)
  const [selectedAdminBranch, setSelectedAdminBranch] = useState(
    () => getStoredAdminSession()?.branch || branches[0],
  )
  const [password, setPassword] = useState('')
  const [superAdminPassword, setSuperAdminPassword] = useState('')
  const [activeAdminTab, setActiveAdminTab] = useState('bookings')
  const [filters, setFilters] = useState(getDefaultAdminFilters)
  const [bookings, setBookings] = useState([])
  const [patients, setPatients] = useState([])
  const [history, setHistory] = useState([])
  const [supportChats, setSupportChats] = useState([])
  const [activeSupportChatId, setActiveSupportChatId] = useState('')
  const [supportReply, setSupportReply] = useState('')
  const [adminSearch, setAdminSearch] = useState({
    bookings: '',
    patients: '',
    history: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [adminNotice, setAdminNotice] = useState('')
  const supportSendInFlightRef = useRef(false)
  const isSuperAdmin = session?.role === 'super'
  const sessionBranch = isSuperAdmin ? '' : session?.branch || selectedAdminBranch
  const dashboardBranchLabel = isSuperAdmin ? 'All branches' : getBranchArea(sessionBranch)

  const activeBookings = bookings.filter((booking) =>
    ['booked', 'visited', 'in treatment'].includes(booking.status.toLowerCase()),
  )
  const todayBookings = activeBookings.filter((booking) => booking.date === getTodayDateValue())
  const websiteBookings = bookings.filter((booking) =>
    booking.source.toLowerCase().includes('website'),
  )
  const bookingSearchTerm = adminSearch.bookings.trim().toLowerCase()
  const patientSearchTerm = adminSearch.patients.trim().toLowerCase()
  const historySearchTerm = adminSearch.history.trim().toLowerCase()
  const visibleBookings = bookingSearchTerm
    ? bookings.filter((booking) =>
        [booking.patientName, booking.phone, booking.email, booking.bookingId, booking.paymentStatus]
          .join(' ')
          .toLowerCase()
          .includes(bookingSearchTerm),
      )
    : bookings
  const visiblePatients = patientSearchTerm
    ? patients.filter((patient) =>
        [patient.patientName, patient.phone, patient.email]
          .join(' ')
          .toLowerCase()
          .includes(patientSearchTerm),
      )
    : patients
  const visibleHistory = historySearchTerm
    ? history.filter((item) =>
        [item.patientName, item.phone, item.bookingId, item.historyId]
          .join(' ')
          .toLowerCase()
          .includes(historySearchTerm),
      )
    : history
  const activeSupportChat =
    supportChats.find((chat) => chat.chatId === activeSupportChatId) ?? supportChats[0]

  const fetchAdminBookings = async (adminSession = session, nextFilters = filters) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-bookings',
        token: adminSession.token,
        ...nextFilters,
        branch: adminSession.role === 'super' ? nextFilters.branch : adminSession.branch,
      })

      setBookings(Array.isArray(result.bookings) ? result.bookings : [])
    } catch (fetchError) {
      if (!isGenericFetchFailure(fetchError)) {
        setError(fetchError.message)
      }

      if (fetchError.message.toLowerCase().includes('session')) {
        window.localStorage.removeItem(adminSessionKey)
        setSession(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminPatients = async (adminSession = session, nextFilters = filters) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-patients',
        token: adminSession.token,
        branch: adminSession.role === 'super' ? nextFilters.branch : adminSession.branch,
      })

      setPatients(Array.isArray(result.patients) ? result.patients : [])
    } catch (fetchError) {
      if (!isGenericFetchFailure(fetchError)) {
        setError(fetchError.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminHistory = async (adminSession = session, nextFilters = filters) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-history',
        token: adminSession.token,
        branch: adminSession.role === 'super' ? nextFilters.branch : adminSession.branch,
      })

      setHistory(Array.isArray(result.history) ? result.history : [])
    } catch (fetchError) {
      if (!isGenericFetchFailure(fetchError)) {
        setError(fetchError.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminSupport = async (adminSession = session, { silent = false } = {}) => {
    if (!adminSession?.token) {
      return
    }

    if (!silent) {
      setIsLoading(true)
    }
    setError('')

    try {
      const result = await fetchAdminSupportChats({
        token: adminSession.token,
        branch: adminSession.role === 'super' ? filters.branch : adminSession.branch,
      })
      const chats = Array.isArray(result.chats) ? result.chats : []

      setSupportChats((current) =>
        chats.map((chat) => {
          const currentChat = current.find((item) => item.chatId === chat.chatId)
          const localMessages = Array.isArray(currentChat?.messages)
            ? currentChat.messages.filter((message) => String(message.messageId || '').startsWith('LOCAL-'))
            : []
          const remoteMessages = Array.isArray(chat.messages) ? chat.messages : []
          const pendingLocalMessages = localMessages.filter(
            (localMessage) =>
              !remoteMessages.some(
                (remoteMessage) =>
                  remoteMessage.sender === localMessage.sender &&
                  remoteMessage.message === localMessage.message,
              ),
          )

          return {
            ...chat,
            messages: [...remoteMessages, ...pendingLocalMessages],
          }
        }),
      )
      setActiveSupportChatId((current) => current || chats[0]?.chatId || '')
    } catch (fetchError) {
      if (!silent && !isGenericFetchFailure(fetchError)) {
        setError(fetchError.message)
      }
    } finally {
      if (!silent) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const refreshTimeout = window.setTimeout(() => {
      fetchAdminBookings()
    }, 0)

    return () => window.clearTimeout(refreshTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (activeAdminTab !== 'support' || !session?.token) {
      return undefined
    }

    const interval = window.setInterval(() => {
      if (supportSendInFlightRef.current) {
        return
      }

      fetchAdminSupport(session, { silent: true })
    }, 4000)

    return () => window.clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAdminTab, filters.branch, session])

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-login',
        password,
        branch: selectedAdminBranch,
        role: 'branch',
      })
      const nextSession = {
        token: result.token,
        expiresAt: result.expiresAt,
        branch: result.branch || selectedAdminBranch,
        role: result.role || 'branch',
      }

      window.localStorage.setItem(adminSessionKey, JSON.stringify(nextSession))
      setFilters((current) => ({
        ...current,
        branch: nextSession.branch,
      }))
      setSession(nextSession)
      setPassword('')
      await fetchAdminBookings(nextSession)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuperAdminLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-login',
        password: superAdminPassword,
        role: 'super',
      })
      const nextSession = {
        token: result.token,
        expiresAt: result.expiresAt,
        branch: '',
        role: 'super',
      }

      window.localStorage.setItem(adminSessionKey, JSON.stringify(nextSession))
      setFilters(getDefaultAdminFilters())
      setSession(nextSession)
      setSuperAdminPassword('')
      await fetchAdminBookings(nextSession, getDefaultAdminFilters())
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    fetchAdminBookings(session, filters)
  }

  const handleAdminTabChange = (tab) => {
    setActiveAdminTab(tab)
    setError('')
    setAdminNotice('')

    if (tab === 'patients') {
      fetchAdminPatients()
    }

    if (tab === 'history') {
      fetchAdminHistory()
    }

    if (tab === 'support') {
      fetchAdminSupport()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(adminSessionKey)
    setSession(null)
    setBookings([])
    setPatients([])
    setHistory([])
    setSupportChats([])
    setActiveSupportChatId('')
    setPassword('')
    setSuperAdminPassword('')
  }

  const handleAdminSearchChange = (tab, value) => {
    setAdminSearch((current) => ({
      ...current,
      [tab]: value,
    }))
  }

  const handleBookingStatusChange = async (booking, status) => {
    setIsLoading(true)
    setError('')

    try {
      await postBookingEndpoint({
        action: 'admin-update-booking',
        token: session.token,
        bookingId: booking.bookingId,
        status,
        branch: sessionBranch,
      })
      await fetchAdminBookings(session, filters)
      await fetchAdminPatients(session)
      await fetchAdminHistory(session)
    } catch (statusError) {
      setError(statusError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookingPaymentStatusChange = async (booking, paymentStatus) => {
    setIsLoading(true)
    setError('')

    try {
      await postBookingEndpoint({
        action: 'admin-update-booking',
        token: session.token,
        bookingId: booking.bookingId,
        status: booking.status,
        branch: sessionBranch,
        paymentMethod: 'Pay at clinic',
        paymentStatus,
        paymentAmount: booking.paymentAmount || 300,
      })
      await fetchAdminBookings(session, filters)
    } catch (paymentError) {
      setError(paymentError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSupportReply = async (event) => {
    event.preventDefault()

    const message = supportReply.trim()

    if (!message || !activeSupportChat?.chatId) {
      return
    }

    setIsLoading(true)
    setError('')
    setAdminNotice('')
    supportSendInFlightRef.current = true

    try {
      await sendAdminSupportMessage({
        token: session.token,
        chatId: activeSupportChat.chatId,
        message,
      })
      setSupportChats((current) =>
        current.map((chat) =>
          chat.chatId === activeSupportChat.chatId
            ? {
                ...chat,
                messages: [
                  ...(Array.isArray(chat.messages) ? chat.messages : []),
                  {
                    messageId: `LOCAL-${Date.now()}`,
                    sender: 'staff',
                    message,
                    createdAt: 'Just now',
                  },
                ],
              }
            : chat,
        ),
      )
      setSupportReply('')
      setAdminNotice('Support reply sent.')
    } catch (replyError) {
      setError(replyError.message)
    } finally {
      supportSendInFlightRef.current = false
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <main className="admin-page admin-login-page">
        <div className="admin-login-grid">
          <section className="admin-login-card">
            <img src="/logo.webp" alt="Apple International Dental" />
            <p className="eyebrow">Admin login</p>
            <h1>Choose branch dashboard</h1>
            <p>Select the clinic branch first, then sign in to open only that branch dashboard.</p>
            <form onSubmit={handleLogin}>
              <label>
                Branch
                <select
                  required
                  value={selectedAdminBranch}
                  onChange={(event) => setSelectedAdminBranch(event.target.value)}
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Password
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                />
              </label>
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Open branch dashboard'}
              </button>
            </form>
          </section>

          <section className="admin-login-card admin-super-login-card">
            <img src="/logo.webp" alt="Apple International Dental" />
            <p className="eyebrow">Super admin login</p>
            <h1>All branches dashboard</h1>
            <p>Review bookings, patients, treatment history, and support activity across every branch.</p>
            <form onSubmit={handleSuperAdminLogin}>
              <label>
                Password
                <input
                  required
                  type="password"
                  value={superAdminPassword}
                  onChange={(event) => setSuperAdminPassword(event.target.value)}
                  placeholder="Enter super admin password"
                />
              </label>
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Open super dashboard'}
              </button>
            </form>
          </section>
        </div>
        {error && <p className="admin-error admin-login-error">{error}</p>}
      </main>
    )
  }

  return (
    <main className="admin-page admin-dashboard">
      <header className="admin-topbar">
        <div className="admin-brand-heading">
          <div>
            <strong>Apple International Dental</strong>
            <p className="eyebrow">{isSuperAdmin ? 'Super admin dashboard' : 'Admin dashboard'}</p>
            <h1>{dashboardBranchLabel} bookings</h1>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <a href="/">View website</a>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-main-column">
      <section className="admin-summary-grid" aria-label="Booking summary">
        <article>
          <span>{activeBookings.length}</span>
          <p>active bookings</p>
        </article>
        <article>
          <span>{todayBookings.length}</span>
          <p>today</p>
        </article>
        <article>
          <span>{websiteBookings.length}</span>
          <p>website</p>
        </article>
      </section>

      <nav className="admin-tabs" aria-label="Admin dashboard sections">
        {[
          ['bookings', 'Bookings'],
          ['patients', 'Patients'],
          ['history', 'Treatment History'],
        ].map(([tab, label]) => (
          <button
            className={activeAdminTab === tab ? 'active' : ''}
            key={tab}
            type="button"
            onClick={() => handleAdminTabChange(tab)}
          >
            {label}
          </button>
        ))}
      </nav>

      {error && <p className="admin-error">{error}</p>}
      {adminNotice && <p className="admin-notice">{adminNotice}</p>}

      {activeAdminTab === 'bookings' && (
        <>
          <form className="admin-filters" onSubmit={handleFilterSubmit}>
            <label>
              From
              <input name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} />
            </label>
            <label>
              To
              <input name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} />
            </label>
            {isSuperAdmin ? (
              <label>
                Branch
                <select name="branch" value={filters.branch} onChange={handleFilterChange}>
                  <option value="">All branches</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {getBranchArea(branch)}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="admin-branch-lock">
                <span>Branch</span>
                <strong>{getBranchArea(sessionBranch)}</strong>
              </div>
            )}
            <label>
              Treatment
              <select name="treatment" value={filters.treatment} onChange={handleFilterChange}>
                <option value="">All treatments</option>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All statuses</option>
                {adminStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </form>

          <section className="admin-table-panel">
            <div className="admin-table-heading">
              <h2>Bookings</h2>
              <div className="admin-table-tools">
                <label>
                  <span>Search patient</span>
                  <input
                    value={adminSearch.bookings}
                    onChange={(event) => handleAdminSearchChange('bookings', event.target.value)}
                    placeholder="Name, phone, email, booking"
                  />
                </label>
                <span>{visibleBookings.length} rows</span>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Treatment</th>
                    <th>Branch</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Payment</th>
                    <th>Booking ID</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleBookings.map((booking) => {
                    const paymentMode = getBookingPaymentMode(booking)
                    const paymentAmount = getBookingPaymentAmount(booking)
                    const clinicPaymentStatus = clinicPaymentStatuses.includes(booking.paymentStatus)
                      ? booking.paymentStatus
                      : 'Payment due at clinic'

                    return (
                      <tr key={`${booking.bookingId}-${booking.date}-${booking.timeSlot}`}>
                        <td>{booking.date}</td>
                        <td>{booking.timeSlot}</td>
                        <td>
                          <strong>{booking.patientName || 'Not added'}</strong>
                          {booking.email && <small>{booking.email}</small>}
                        </td>
                        <td>{booking.phone || '-'}</td>
                        <td>{booking.treatment || '-'}</td>
                        <td>{getBranchArea(booking.branch)}</td>
                        <td>
                          <select
                            className={`admin-status-select status-${booking.status
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`}
                            value={booking.status}
                            onChange={(event) => handleBookingStatusChange(booking, event.target.value)}
                            disabled={isLoading || !booking.bookingId}
                          >
                            {adminStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{booking.source || '-'}</td>
                        <td>
                          {paymentMode === 'online' ? (
                            <span className="admin-payment-pill paid">
                              <strong>Paid online</strong>
                              <small>{paymentAmount ? `Rs ${paymentAmount}` : booking.paymentStatus || 'Paid'}</small>
                            </span>
                          ) : (
                            <div
                              className={`admin-clinic-payment-control ${
                                clinicPaymentStatus === 'Collected at clinic' ? 'collected' : 'due'
                              }`}
                            >
                              <strong>Selected Pay at clinic</strong>
                              <select
                                value={clinicPaymentStatus}
                                onChange={(event) =>
                                  handleBookingPaymentStatusChange(booking, event.target.value)
                                }
                                disabled={isLoading || !booking.bookingId}
                              >
                                <option value="Payment due at clinic">Not collected</option>
                                <option value="Collected at clinic">Collected at clinic</option>
                              </select>
                            </div>
                          )}
                        </td>
                        <td>{booking.bookingId || '-'}</td>
                      </tr>
                    )
                  })}
                  {!visibleBookings.length && (
                    <tr>
                      <td colSpan="10">No bookings found for these filters or search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeAdminTab === 'patients' && (
        <section className="admin-table-panel">
          <div className="admin-table-heading">
            <h2>Patients</h2>
            <div className="admin-table-tools">
              <label>
                <span>Search patient</span>
                <input
                  value={adminSearch.patients}
                  onChange={(event) => handleAdminSearchChange('patients', event.target.value)}
                  placeholder="Name, phone, email"
                />
              </label>
              <span>{visiblePatients.length} records</span>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>First visit</th>
                  <th>Last visit</th>
                  <th>Total visits</th>
                  <th>Active treatment</th>
                  <th>Status</th>
                  <th>Last branch</th>
                </tr>
              </thead>
              <tbody>
                {visiblePatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>
                      <strong>{patient.patientName || 'Not added'}</strong>
                      {patient.notes && <small>{patient.notes}</small>}
                    </td>
                    <td>{patient.phone || '-'}</td>
                    <td>{patient.email || '-'}</td>
                    <td>{patient.firstVisitDate || '-'}</td>
                    <td>{patient.lastVisitDate || '-'}</td>
                    <td>{patient.totalVisits || 0}</td>
                    <td>{patient.activeTreatment || '-'}</td>
                    <td>{patient.currentStatus || '-'}</td>
                    <td>{patient.lastBranch ? getBranchArea(patient.lastBranch) : '-'}</td>
                  </tr>
                ))}
                {!visiblePatients.length && (
                  <tr>
                    <td colSpan="9">No patient records found for this search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeAdminTab === 'history' && (
        <section className="admin-table-panel">
          <div className="admin-table-heading">
            <h2>Treatment history</h2>
            <div className="admin-table-tools">
              <label>
                <span>Search patient</span>
                <input
                  value={adminSearch.history}
                  onChange={(event) => handleAdminSearchChange('history', event.target.value)}
                  placeholder="Name, phone, booking"
                />
              </label>
              <span>{visibleHistory.length} completed</span>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-history-table">
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Treatment</th>
                  <th>Appointment</th>
                  <th>Branch</th>
                  <th>Notes</th>
                  <th>Booking ID</th>
                </tr>
              </thead>
              <tbody>
                {visibleHistory.map((item) => {
                  const completedDate = getCompletedDateParts(item.completedDate)

                  return (
                  <tr key={item.historyId}>
                    <td>
                      <strong>{completedDate.date}</strong>
                      {completedDate.time && <small>{completedDate.time}</small>}
                    </td>
                    <td>{item.patientName || '-'}</td>
                    <td>{item.phone || '-'}</td>
                    <td>{item.treatment || '-'}</td>
                    <td>
                      <strong>{item.date || '-'}</strong>
                      <small>{item.timeSlot || '-'}</small>
                    </td>
                    <td>{item.branch ? getBranchArea(item.branch) : '-'}</td>
                    <td>{item.finalNotes || '-'}</td>
                    <td>{item.bookingId || '-'}</td>
                  </tr>
                  )
                })}
                {!visibleHistory.length && (
                  <tr>
                    <td colSpan="8">No completed treatment history found for this search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeAdminTab === 'support' && (
        <section className="admin-table-panel support-inbox-panel">
          <div className="admin-table-heading">
            <h2>{isSuperAdmin ? 'All branch support chats' : 'Branch support chat'}</h2>
            <div className="admin-table-tools">
              <button className="admin-refresh-button" type="button" onClick={() => fetchAdminSupport()}>
                Refresh
              </button>
              <span>{supportChats.length} conversations</span>
            </div>
          </div>

          <div className="support-inbox">
            <div className="support-chat-list" aria-label="Support chat conversations">
              {supportChats.length ? (
                supportChats.map((chat) => (
                  <button
                    className={chat.chatId === activeSupportChat?.chatId ? 'active' : ''}
                    key={chat.chatId}
                    type="button"
                    onClick={() => setActiveSupportChatId(chat.chatId)}
                  >
                    <strong>{chat.name}</strong>
                    <span>{chat.phone}</span>
                    <small>
                      {chat.status} - {chat.updatedAt || chat.createdAt}
                    </small>
                  </button>
                ))
              ) : (
                <p>{isSuperAdmin ? 'No support chats found yet.' : 'No support chats for this branch yet.'}</p>
              )}
            </div>

            <div className="support-chat-thread">
              {activeSupportChat ? (
                <>
                  <div className="support-chat-profile">
                    <div>
                      <span>Patient</span>
                      <strong>{activeSupportChat.name}</strong>
                    </div>
                    <p>
                      {activeSupportChat.phone} - {activeSupportChat.email}
                    </p>
                  </div>

                  <div className="support-chat-messages">
                    {activeSupportChat.messages.map((message) => (
                      <article className={message.sender === 'staff' ? 'staff' : 'patient'} key={message.messageId}>
                        <strong>{message.sender === 'staff' ? 'Support staff' : activeSupportChat.name}</strong>
                        <p>{message.message}</p>
                        <small>{message.createdAt}</small>
                      </article>
                    ))}
                  </div>

                  <form className="support-reply-form" onSubmit={handleSupportReply}>
                    <textarea
                      required
                      rows="3"
                      value={supportReply}
                      onChange={(event) => setSupportReply(event.target.value)}
                      placeholder="Reply as branch support staff"
                    />
                    <button type="submit" disabled={isLoading || !supportReply.trim()}>
                      Send reply
                    </button>
                  </form>
                </>
              ) : (
                <p className="support-empty-thread">Select a support chat to reply.</p>
              )}
            </div>
          </div>
        </section>
      )}
      </div>

      <aside className="doctor-login-card support-login-card">
        <div className="doctor-login-symbol">
          <img src="/dental-assistant-logo.webp" alt="Apple Dental support chat" />
        </div>
        <p className="eyebrow">{isSuperAdmin ? 'All branch support' : 'Branch support'}</p>
        <strong>Support Chat</strong>
        <p>
          Open patient support messages for {isSuperAdmin ? 'all branches' : getBranchArea(sessionBranch)} and reply
          from this dashboard.
        </p>
        <div className="support-card-meta">
          <span>{supportChats.length}</span>
          <small>conversations loaded</small>
        </div>
        <button
          type="button"
          className={activeAdminTab === 'support' ? 'active' : ''}
          onClick={() => handleAdminTabChange('support')}
        >
          {activeAdminTab === 'support' ? 'Support chat open' : 'Open support chat'}
        </button>
      </aside>
    </main>
  )
}
