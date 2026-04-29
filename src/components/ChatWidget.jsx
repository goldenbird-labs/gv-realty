import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, RotateCcw, Home } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SUGGESTIONS = [
  'Show me beachfront homes under $5M',
  'I need a 4-bed family home in Miami',
  'What commercial spaces are available?',
  'Find me a penthouse or condo to rent',
]

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-4 py-2">
      <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
        <Home size={13} className="text-gold" />
      </div>
      <div className="bg-cream border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex items-end gap-2 px-4 py-1.5 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <img src="/giomar.jpg" alt="Giomar" className="w-8 h-8 rounded-full object-cover shrink-0" />
      )}
      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-navy-900 text-white rounded-2xl rounded-br-sm'
            : 'bg-cream border border-gray-200 text-navy-900 rounded-2xl rounded-bl-sm prose-chat'
        } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
      >
        {isUser ? msg.content : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
        )}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState('')
  const [showBadge, setShowBadge] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 8000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming, loading])

  useEffect(() => {
    if (open && !loading) inputRef.current?.focus()
  }, [open, loading])

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || loading) return
    const userMsg = { role: 'user', content }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setStreaming('')

    let full = ''
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.ok) throw new Error('Server error')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6)
          if (payload === '[DONE]') break
          try {
            const { content: c } = JSON.parse(payload)
            if (c) { full += c; setStreaming(full) }
          } catch {}
        }
      }
      setStreaming('')
      setMessages(prev => [...prev, { role: 'assistant', content: full }])
    } catch (err) {
      setStreaming('')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry about that, something went wrong on my end. Give me a call at +1 (562) 857-1007 and I'll be happy to help!",
        isError: true,
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  const showWelcome = messages.length === 0

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="chat-panel w-[calc(100vw-48px)] sm:w-[380px] max-w-[420px] rounded-2xl overflow-hidden flex flex-col"
            style={{ height: '560px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-navy-900">
              <img
                src="/giomar.jpg"
                className="w-9 h-9 rounded-full object-cover border border-gold/30"
                alt="Giomar"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">Giomar — G&V Realty</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-white/50">Online · Usually replies instantly</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="text-white/40 hover:text-gold p-1.5 transition-colors"
                    title="New conversation"
                  >
                    <RotateCcw size={13} />
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white p-1.5 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto py-4 bg-white" style={{ scrollbarWidth: 'thin' }}>
              {showWelcome ? (
                <div className="flex flex-col items-center text-center px-6 pt-4 pb-4">
                  <img
                    src="/giomar.jpg"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold/30 mb-4 shadow-lg"
                    alt="Giomar"
                  />
                  <h3 className="font-display text-2xl text-navy-900 mb-1">Hi, I'm Giomar 👋</h3>
                  <p className="text-xs text-gold tracking-wide mb-3">G&V Realty · California & Florida</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    Looking to buy, sell, or rent? Tell me what you have in mind and I'll help you find the right property or answer any questions you have.
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-3">Quick questions</p>
                  <div className="flex flex-col gap-2 w-full">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-left text-sm px-4 py-3 border border-gray-200 rounded-xl hover:border-gold hover:bg-cream transition-all duration-200 text-navy-900"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  {messages.map((msg, i) => <Message key={i} msg={msg} />)}
                  {streaming && <Message msg={{ role: 'assistant', content: streaming }} />}
                  {loading && !streaming && <TypingIndicator />}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-gold transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Describe your ideal property…"
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-navy-900 placeholder-gray-400 font-sans max-h-24"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center shrink-0 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors hover:bg-navy-700"
                >
                  <Send size={13} className="text-gold" />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-2">Press Enter to send</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => { setOpen(o => !o); setShowBadge(false) }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2.5 px-5 py-3 rounded-full text-navy-900 text-sm font-semibold shadow-xl"
        style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #A8883A 100%)', boxShadow: '0 4px 24px rgba(201,168,76,0.5)' }}
      >
        {!open && <span className="absolute inset-0 rounded-full animate-ping bg-gold opacity-20 pointer-events-none" />}

        <AnimatePresence>
          {showBadge && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
              <MessageCircle size={17} />
              Chat with us
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
