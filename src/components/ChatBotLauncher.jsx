import { useEffect, useRef, useState } from 'react'
import {
  branchContacts,
  branches,
  bengaluruConsultationFeeAmount,
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
    text: `The consultation fee is Rs ${consultationFeeAmount} at most clinics and Rs ${bengaluruConsultationFeeAmount} at the Bengaluru branch. Choose a treatment, branch, date, and slot to request an appointment.`,
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
    quickReplies,
  },
]

const initialSupportForm = {
  name: '',
  phone: '',
  email: '',
  branch: branches[0],
  message: '',
}

const disclaimerText =
  'This chatbot provides general dental information and is not a substitute for professional diagnosis or treatment.'
const assistantPopSoundSrc =
  'data:audio/wav;base64,UklGRqQHAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYAHAAAAAI0AaQERAQn/rfw//Ob+UANSBjAF7P+3+fX2KvrlAVwJbQscBjH8vfNa8oP5XgXdDvcPcAfT+ffucO2n9tQFjBJ3FX4MG/wL7ZbnEe/0/5sRxBpfFkIGUvKN5AzkbvF1BgwZIiAIGEEE3O1F32bffu73BWQbJiW2HqAKa/Hj3XvYs+MR+wMV2CYoKdAaYgHk5s7V8dTN5HH/yBp2LL8tAh7jAvHmN9Q20bzeyfd7Ez4oGy/4JSoQKfX03RbSOtUf5iX/OxiAKbAttyPfDqz1zd++0+zUyOIP+SsRJSSpLHko9hiiAsLrndrF0+jYdegh/h0UqySWKz8n7hhsBPnu8N121XvXWOMH9vMKGR09KN8pxSH0ESj+8eqf3FPWUNnL5B/2cwmXGuslICmoI8wWUgXj8kjjnNm81+fdxeq2+1kNQxyhJb0nTyJ5FokGhPWP5l3cttgo3PrlVvSiBP4Twx/3JZ8l5B4AEwYEfvT85q/dDNqS3MTkPvH0/5AOxxrAIk4lIiLNGaMNh/+Y8eblId5c2+vdXuWQ8N79XgstF6oftSPRIi0doBOAB3f6RO6A5Gzexdyy38LmAPES/WwJfxTuHLchTyKyHl8XRw2qAe/1feuL4/7eVN6R4UrorfGg/OAHKBJVGoUfMCEzH9AZqxGsB+38lvK/6VHj8d/w30LjhekL8u37JwavD5QXDx2fHwsfbBsmFd8MaAOu+aHwGunL4yzhdeGU5Djq0/Gt+vQDzgxwFDAajh1GHk8c3hdeEWYJqwDx9/jva+nV5JPi0OJ/5WDqA/HY+DcBbQnREMoW4hrKHGEcthkFFbMORAdR/3j3VvB26kjmGeQP5CTmKerN75/2GP6pBcMM3xKPF30aeRt1GokX8BIDDTIG+/7j92jx/+sG6L/lT+W55uDph+5Z9O36zwGGCKAOtBNtF5AZ/BmuGMEVaRHzC74FM/+/+M7ywO3m6X7nquZ1587pi+1t8iL4TP6IBHIKrQ/oE+EWbBh2GP8WJBQTEA4LZgVy/5D5GvRj77DrOOke6HDoJuoj7TbxIvaa+0sB4QYJDHcQ6xM0FjQX3xY7FWMShQ7YCaQENf/Y+dz0h/AW7bjqjemj6ffqc+3y8ED1IPpL/3kEYQnADVgR+hODFeAVDhUaEyEQTwzZB/4CAP4l+a301vDS7cnr1Or/6kXsk+7I8bj1LPro/q0DOghTDMMPXRIAFJgUHxScEiYQ3wzzCJYEAwB2+yr3V/Mv8NntcuwL7KfsPu658Pbzy/cE/GwAyAThCIMMgA+yEf4SVhO2EigRwQ6hC/EH4AOk/3H7fff78xTx7+6k7ULtzu0/74DxdvT599378P//A9YHRwsmDlAQqxEoEsERfRBsDqoLWgimBL0Az/wN+af1xfKL8BTvce6o7rbvjfEU9C33r/pu/jwC6wVLCTUMhQ4eEO4Q7RAbEIMOOgxcCQ8GewLN/jL71vfj9HzyvvC+74fvG/By8XvzG/Yy+Zn8JQCsAwIH/Ql7DFwOig/4D6IPiw7DDGAKgQdIBN8Abv0i+iH3kPSQ8jbxlPCx8IrxE/M69eP37foy/ooBygTMB2sKhgwFDtUO7g5ODv4MEAubCL8FnwJj/zH8MvmL9lv0vvLG8YDx7fEJ88P0B/e4+bP81P/0AusFlgjUCogMnw0LDsgN2gxNCzQJrAbTA84Awf3V+iv45/Uj9PbybfKO8ljzv/Sy9hf50fu8/rMBkgQ1B3oJRQuBDB4NFA1mDBwLRwn/BmEEjwGs/tz7RPkF9zn1+fNS803z6vMg9d72EPmX+1T+IwHhA2oGnghiCqALRwxQDLsLkArfCL0GRwSdAeH+Nvy/+Zv35vW19Bj0FfSs9Nb1gvea+QP8nv5HAd4DPwZMCOsJBwuSC4UL4QqwCQEI6wWKA/0AZf7m+575rvct9i/1wfTn9KH14vab+LT6Ef2S/xcCfQSlBnIIzQmkCuwKogrKCXEIqAaIBC0CuP9J/QH7/vhc9zD2ifVx9eb15PZb+Dn6Y/y7/iIBeAObBXEH3wjTCUAKIQp4CU4ItAbABI0COQDl/bD7uPkZ+On2N/YM9mv2Tveo+Gb6cPyp/vIALAM4BfgGVgg/CaYJhgnhCMEHNQZUBDkCAQDL/bb74Pli+FD3uvan9hn3B/hl+SD7Hf1B/24BhANmBfkGJwjgCBoJ0ggMCNQGPAVaA0oBKv8Y/TP7lPlT+IL3LPdW9/33FvmT+l38Wf5rAHUCWgT9BUcHJgiNCHgI5gfiBnsFxQPZAdX/1P32+1X6Cvkm+Lb3wfdG+Dz5lfo9/BvEwAIAt0DdgW8Bp0HDAgCCIEHkQY/BaADzQHh//j9MPyj+mj5kvgs+D34wvi1+QX7n/xr/kwAJwLgA1wFhQZKB58HgAfuBvQFnwQGA0ABaf+c/ff7kPp/+dP4lvjL+G/5d/rU+2/9Mf/9ALgCRwSTBYYGEwcyB+EGJQYKBaIDAwJGAIb+4Pxs+0H6cvkK+RD5g/lb+ov7Af2j/loACQKXA+oE7QWSBs8GnwYGBg4FxwNFAqEA9P5a/ez7wPo='

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

  if (
    /(treatment|teeth|tooth|dental|dentist|cleaning|kids|root canal|crown|bridge|braces|aligner|implant|cosmetic|gum|extraction|filling|veneer|whitening|sensitivity|decay|cavity)/.test(
      text,
    )
  ) {
    return 'treatments'
  }

  return ''
}

const clearActiveChatControls = (messages) =>
  messages.map((message) => {
    const nextMessage = { ...message }

    delete nextMessage.quickReplies
    delete nextMessage.showFeedback

    return nextMessage
  })

const playAssistantIntroSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    return Promise.resolve()
  }

  const audioContext = new AudioContext()
  const startSound = () => {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    const startedAt = audioContext.currentTime

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(520, startedAt)
    oscillator.frequency.exponentialRampToValueAtTime(920, startedAt + 0.08)
    oscillator.frequency.exponentialRampToValueAtTime(360, startedAt + 0.18)
    gain.gain.setValueAtTime(0.0001, startedAt)
    gain.gain.exponentialRampToValueAtTime(0.14, startedAt + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, startedAt + 0.22)
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start(startedAt)
    oscillator.stop(startedAt + 0.24)
    oscillator.addEventListener('ended', () => {
      audioContext.close().catch(() => undefined)
    })
  }

  if (audioContext.state === 'suspended') {
    return audioContext.resume().then(startSound)
  }

  startSound()
  return Promise.resolve()
}

const playAssistantIntroSoundWithFallback = () => {
  let needsRetry = true

  const playAudioElement = () => {
    const audio = new Audio(assistantPopSoundSrc)
    audio.volume = 0.42
    return audio.play()
  }

  const retrySound = () => {
    if (!needsRetry) {
      return
    }

    needsRetry = false
    playAudioElement()
      .catch(() => playAssistantIntroSound())
      .catch(() => undefined)
    window.removeEventListener('pointerdown', retrySound)
    window.removeEventListener('keydown', retrySound)
  }

  playAudioElement()
    .catch(() => playAssistantIntroSound())
    .then(() => {
      needsRetry = false
    })
    .catch(() => {
      window.addEventListener('pointerdown', retrySound, { once: true })
      window.addEventListener('keydown', retrySound, { once: true })
    })

  return () => {
    needsRetry = false
    window.removeEventListener('pointerdown', retrySound)
    window.removeEventListener('keydown', retrySound)
  }
}

export function ChatBotLauncher({ playMainSiteIntro = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isIntroPopping, setIsIntroPopping] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [supportMode, setSupportMode] = useState('bot')
  const [supportForm, setSupportForm] = useState(initialSupportForm)
  const [supportSession, setSupportSession] = useState(null)
  const [isSupportLoading, setIsSupportLoading] = useState(false)
  const [supportError, setSupportError] = useState('')
  const messageListRef = useRef(null)

  useEffect(() => {
    if (!playMainSiteIntro) {
      setIsIntroPopping(false)
      return undefined
    }

    setIsIntroPopping(true)
    return playAssistantIntroSoundWithFallback()
  }, [playMainSiteIntro])

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
            const fetchedMessages = result.messages.map((message) => ({
              from: message.sender === 'staff' ? 'bot' : 'user',
              title: message.sender === 'staff' ? 'Support staff' : undefined,
              text: message.message,
            }))

            setMessages((current) => [
              ...fetchedMessages,
              ...current.filter((localMessage) =>
                localMessage.localOnly &&
                !fetchedMessages.some(
                  (message) =>
                    message.from === localMessage.from &&
                    message.text === localMessage.text,
                ),
              ),
            ])
          }
        })
        .catch(() => {})
    }

    const interval = window.setInterval(refreshChat, 3000)

    return () => window.clearInterval(interval)
  }, [supportSession])

  const startSupportIntake = () => {
    setSupportMode('intake')
    setSupportError('')
    setMessages((current) => [
      ...clearActiveChatControls(current),
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
      ...clearActiveChatControls(current),
      { from: 'user', text: topic.title },
      {
        from: 'bot',
        title: topic.title,
        text: topic.text,
        actions: topic.actions,
        showFeedback: true,
      },
    ])
  }

  const handleAnswerFeedback = (answer) => {
    if (answer === 'yes') {
      setMessages((current) => [
        ...clearActiveChatControls(current),
        { from: 'user', text: 'Yes' },
        {
          from: 'bot',
          text: 'Glad I could help. You can type another question anytime.',
        },
      ])
      return
    }

    setMessages((current) => [
      ...clearActiveChatControls(current),
      { from: 'user', text: 'No' },
      {
        from: 'bot',
        text: 'No problem. Choose another topic and I will guide you.',
        quickReplies,
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

  const handleSupportBack = () => {
    setSupportMode('bot')
    setSupportError('')
    setSupportForm(initialSupportForm)
    setMessages((current) => [
      ...clearActiveChatControls(current),
      {
        from: 'bot',
        text: 'No problem. Choose another topic and I will guide you.',
        quickReplies,
      },
    ])
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
        name: supportForm.name,
      }

      setSupportSession(nextSession)
      setSupportMode('live')
      setMessages([
        {
          from: 'bot',
          title: 'Support staff',
          text: `Your chat has been sent to ${getBranchArea(nextSession.branch)} branch. A staff member will be here with you shortly.`,
        },
        {
          from: 'user',
          text: supportForm.message,
          localOnly: true,
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
      setMessages((current) => [...current, { from: 'user', text: message, localOnly: true }])

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

    if (!topicId) {
      setMessages((current) => [
        ...clearActiveChatControls(current),
        { from: 'user', text: message },
        {
          from: 'bot',
          title: 'Choose a topic',
          text:
            'I could not match that yet. Try keywords like treatments, schemes, branches, booking, emergency, or support staff.',
          quickReplies,
        },
      ])
      return
    }

    const topic = chatTopics[topicId]

    setMessages((current) => [
      ...clearActiveChatControls(current),
      { from: 'user', text: message },
      {
        from: 'bot',
        title: topic.title,
        text: topic.text,
        actions: topic.actions,
        showFeedback: true,
      },
    ])
  }

  return (
    <div className={`chatbot-launcher${isOpen ? ' open' : ''}${isIntroPopping && !isOpen ? ' intro-pop' : ''}`}>
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

          <p className="chatbot-disclaimer">{disclaimerText}</p>

          <div className="chatbot-messages" ref={messageListRef}>
            {messages.map((message, index) => (
              <article className={`chatbot-message ${message.from}`} key={`${message.from}-${index}`}>
                {message.title && <strong>{message.title}</strong>}
                <p>{message.text}</p>
                {message.quickReplies && supportMode !== 'intake' && (
                  <div className="chatbot-actions">
                    {message.quickReplies.map((reply) => (
                      <button type="button" key={reply.id} onClick={() => handleQuickReply(reply.id)}>
                        {reply.label}
                      </button>
                    ))}
                  </div>
                )}
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
                {message.showFeedback && (
                  <div className="chatbot-feedback">
                    <span>Did this answer your question?</span>
                    <div>
                      <button type="button" onClick={() => handleAnswerFeedback('yes')}>
                        Yes
                      </button>
                      <button type="button" onClick={() => handleAnswerFeedback('no')}>
                        No
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {supportMode === 'intake' && (
            <form className="chatbot-support-form" onSubmit={handleSupportStart}>
              <button className="chatbot-support-back" type="button" onClick={handleSupportBack}>
                Back to topics
              </button>
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
          )}
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        aria-expanded={isOpen}
        aria-label="Open Apple Dental chat assistant"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img src="/dental-assistant-logo.webp" alt="Apple Dental chat assistant" />
      </button>
    </div>
  )
}
