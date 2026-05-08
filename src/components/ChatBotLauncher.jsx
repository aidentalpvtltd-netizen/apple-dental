import { useEffect, useRef, useState } from 'react'
import {
  branchContacts,
  branches,
  consultationFeeAmount,
  createSupportChat,
  fetchSupportChat,
  getBranchArea,
  getWhatsappLink,
  sendSupportMessage,
} from '../config/siteContent.js'

const chatTopics = {
  treatments: {
    title: 'Treatments',
    text:
      'We can help with cleanings, kids dentistry, root canals, crowns, braces, aligners, implants, cosmetic dentistry, gum care, extractions, and emergency dental concerns.',
    actions: [
      { label: 'View treatments', href: '/#treatments' },
      { label: 'Book consultation', href: '/#booking' },
    ],
  },
  schemes: {
    title: 'Schemes',
    text:
      'Apple International Dental supports scheme guidance for CGHS, ECHS, EHS, ESIC, CAPF, CRPF, SCR, and Aarogya Bhadratha patients.',
    actions: [
      { label: 'View schemes', href: '/schemes?scroll=scheme-list' },
      { label: 'Ask on WhatsApp', href: getWhatsappLink(branchContacts[0].branch), external: true },
    ],
  },
  branches: {
    title: 'Branches',
    text:
      'You can choose the nearest Apple International Dental branch and contact that clinic directly for appointments, directions, and document guidance.',
    actions: [
      { label: 'Find branch', href: '/#contact' },
      { label: 'WhatsApp branch', href: getWhatsappLink(branchContacts[0].branch), external: true },
    ],
  },
  booking: {
    title: 'Booking',
    text: `The consultation fee is Rs ${consultationFeeAmount}. Choose a treatment, branch, date, and slot, then submit the appointment request after payment.`,
    actions: [{ label: 'Book now', href: '/#booking' }],
  },
  emergency: {
    title: 'Emergency care',
    text:
      'For tooth pain, swelling, broken teeth, bleeding, or urgent dental trauma, contact the branch as soon as possible so the team can guide the next available visit.',
    actions: [
      { label: 'Call helpline', href: 'tel:18003092334' },
      { label: 'WhatsApp now', href: getWhatsappLink(branchContacts[0].branch), external: true },
    ],
  },
}

const quickReplies = [
  { id: 'treatments', label: 'Treatments' },
  { id: 'schemes', label: 'Schemes' },
  { id: 'branches', label: 'Branches' },
  { id: 'booking', label: 'Booking' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'support', label: 'Chat with support staff' },
]

const initialMessages = [
  {
    from: 'bot',
    text:
      'Hi, I am the Apple Dental assistant. Choose a topic and I will guide you to the right section.',
  },
]

const initialSupportForm = {
  name: '',
  phone: '',
  email: '',
  branch: branches[0],
  message: '',
}

const getTopicFromMessage = (message) => {
  const text = message.toLowerCase()

  if (/(support|staff|person|human|reception|front desk)/.test(text)) {
    return 'support'
  }

  if (/(scheme|cghs|echs|ehs|esic|capf|crpf|scr|aarogya|abs)/.test(text)) {
    return 'schemes'
  }

  if (/(branch|location|address|near|clinic|map|phone|contact)/.test(text)) {
    return 'branches'
  }

  if (/(book|appointment|consult|fee|payment|slot|time|date)/.test(text)) {
    return 'booking'
  }

  if (/(emergency|pain|swelling|broken|bleeding|urgent|trauma)/.test(text)) {
    return 'emergency'
  }

  return 'treatments'
}

export function ChatBotLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [supportMode, setSupportMode] = useState('bot')
  const [supportForm, setSupportForm] = useState(initialSupportForm)
  const [supportSession, setSupportSession] = useState(null)
  const [isSupportLoading, setIsSupportLoading] = useState(false)
  const [supportError, setSupportError] = useState('')
  const messageListRef = useRef(null)

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, supportMode])

  useEffect(() => {
    if (!supportSession?.chatId) {
      return undefined
    }

    const refreshChat = () => {
      fetchSupportChat({ chatId: supportSession.chatId })
        .then((result) => {
          if (Array.isArray(result.messages)) {
            setMessages(result.messages.map((message) => ({
              from: message.sender === 'staff' ? 'bot' : 'user',
              title: message.sender === 'staff' ? 'Support staff' : undefined,
              text: message.message,
            })))
          }
        })
        .catch(() => {})
    }

    const interval = window.setInterval(refreshChat, 12000)

    return () => window.clearInterval(interval)
  }, [supportSession])

  const addBotTopic = (topicId) => {
    const topic = chatTopics[topicId]

    setMessages((current) => [
      ...current,
      {
        from: 'bot',
        title: topic.title,
        text: topic.text,
        actions: topic.actions,
      },
    ])
  }

  const startSupportIntake = () => {
    setSupportMode('intake')
    setSupportError('')
    setMessages((current) => [
      ...current,
      { from: 'user', text: 'Chat with support staff' },
      {
        from: 'bot',
        title: 'Support staff',
        text:
          'Please share your name, phone number, email, and preferred branch. Your message will go only to that branch dashboard.',
      },
    ])
  }

  const handleQuickReply = (topicId) => {
    if (topicId === 'support') {
      startSupportIntake()
      return
    }

    const topic = chatTopics[topicId]

    setMessages((current) => [
      ...current,
      { from: 'user', text: topic.title },
      {
        from: 'bot',
        title: topic.title,
        text: topic.text,
        actions: topic.actions,
      },
    ])
  }

  const handleSupportFormChange = ({ target: { name, value } }) => {
    setSupportForm((current) => ({
      ...current,
      [name]: name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value,
    }))
    setSupportError('')
  }

  const handleSupportStart = async (event) => {
    event.preventDefault()
    setIsSupportLoading(true)
    setSupportError('')

    try {
      const result = await createSupportChat(supportForm)
      const nextSession = {
        chatId: result.chatId,
        branch: result.branch || supportForm.branch,
      }

      setSupportSession(nextSession)
      setSupportMode('live')
      setMessages([
        {
          from: 'bot',
          title: 'Support staff',
          text: `Your chat has been sent to ${getBranchArea(nextSession.branch)}. A staff member can reply from the branch dashboard.`,
        },
        {
          from: 'user',
          text: supportForm.message,
        },
      ])
      setSupportForm(initialSupportForm)
    } catch (error) {
      setSupportError(error.message)
    } finally {
      setIsSupportLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const message = inputValue.trim()

    if (!message) {
      return
    }

    setInputValue('')

    if (supportSession?.chatId) {
      setMessages((current) => [...current, { from: 'user', text: message }])

      try {
        await sendSupportMessage({
          chatId: supportSession.chatId,
          sender: 'patient',
          message,
        })
      } catch (error) {
        setMessages((current) => [
          ...current,
          {
            from: 'bot',
            title: 'Support staff',
            text: error.message,
          },
        ])
      }

      return
    }

    const topicId = getTopicFromMessage(message)

    if (topicId === 'support') {
      setMessages((current) => [...current, { from: 'user', text: message }])
      startSupportIntake()
      return
    }

    const topic = chatTopics[topicId]

    setMessages((current) => [
      ...current,
      { from: 'user', text: message },
      {
        from: 'bot',
        title: topic.title,
        text: topic.text,
        actions: topic.actions,
      },
    ])
  }

  return (
    <div className={`chatbot-launcher${isOpen ? ' open' : ''}`}>
      {isOpen && (
        <section className="chatbot-panel" aria-label="Apple Dental chat assistant">
          <div className="chatbot-header">
            <div>
              <span>Dental assistant</span>
              <strong>Ask Apple Dental</strong>
            </div>
            <button type="button" aria-label="Close chat assistant" onClick={() => setIsOpen(false)}>
              x
            </button>
          </div>

          <div className="chatbot-messages" ref={messageListRef}>
            {messages.map((message, index) => (
              <article className={`chatbot-message ${message.from}`} key={`${message.from}-${index}`}>
                {message.title && <strong>{message.title}</strong>}
                <p>{message.text}</p>
                {message.actions && (
                  <div className="chatbot-actions">
                    {message.actions.map((action) => (
                      <a
                        href={action.href}
                        key={action.label}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noreferrer' : undefined}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {supportMode === 'intake' && (
            <form className="chatbot-support-form" onSubmit={handleSupportStart}>
              <input
                required
                name="name"
                type="text"
                placeholder="Name"
                value={supportForm.name}
                onChange={handleSupportFormChange}
              />
              <input
                required
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Phone number"
                value={supportForm.phone}
                onChange={handleSupportFormChange}
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                value={supportForm.email}
                onChange={handleSupportFormChange}
              />
              <select
                required
                name="branch"
                value={supportForm.branch}
                onChange={handleSupportFormChange}
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {getBranchArea(branch)}
                  </option>
                ))}
              </select>
              <textarea
                required
                name="message"
                rows="3"
                placeholder="How can support help?"
                value={supportForm.message}
                onChange={handleSupportFormChange}
              />
              {supportError && <p>{supportError}</p>}
              <button type="submit" disabled={isSupportLoading}>
                {isSupportLoading ? 'Starting chat...' : 'Start support chat'}
              </button>
            </form>
          )}

          {supportMode !== 'intake' && (
            <div className="chatbot-quick-replies" aria-label="Quick chat topics">
              {quickReplies.map((reply) => (
                <button type="button" key={reply.id} onClick={() => handleQuickReply(reply.id)}>
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={supportSession ? 'Message support staff' : 'Type a question'}
              aria-label="Type a question for the dental assistant"
            />
            <button type="submit">Send</button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        aria-expanded={isOpen}
        aria-label="Open Apple Dental chat assistant"
        onClick={() => {
          setIsOpen((current) => {
            const nextOpen = !current

            if (nextOpen && messages.length === 1) {
              window.setTimeout(() => addBotTopic('booking'), 120)
            }

            return nextOpen
          })
        }}
      >
        <img src="/dental-assistant-logo.png" alt="" aria-hidden="true" />
      </button>
    </div>
  )
}
