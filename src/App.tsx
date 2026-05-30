import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

/* ── Mock Boot Sequence Component ── */
const BOOT_LOGS = [
  'Initializing AXON-OS v1.2.0...',
  'Checking core modules...',
  'Loading Pixel Grid engine...',
  'Establishing secure link...',
  'Decrypting neural patterns...',
  'System integrity: 100%',
  'Ready for input.'
]

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    let current = 0
    const timer = setInterval(() => {
      if (current < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[current]])
        current++
      } else {
        clearInterval(timer)
        setTimeout(onComplete, 1000)
      }
    }, 400)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-[2000] flex items-center justify-center p-8 font-mono">
      <div className="max-w-2xl w-full">
        {logs.map((log, i) => (
          <div key={i} className="text-primary mb-2 animate-pulse">
            <span className="mr-2">{'>'}</span>{log}
          </div>
        ))}
        {logs.length === BOOT_LOGS.length && (
          <div className="w-full h-1 bg-surface mt-4 overflow-hidden">
            <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Terminal Component ── */
function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>(['Welcome to AXON Terminal.', 'Type "help" for commands.'])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const newHistory = [...history, `> ${input}`]
    const cmd = input.toLowerCase().trim()
    
    if (cmd === 'help') {
      newHistory.push('Available commands: help, status, clear, about')
    } else if (cmd === 'status') {
      newHistory.push('SYSTEM: ONLINE', 'MEMORY: OPTIMAL', 'UPLINK: ACTIVE')
    } else if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    } else if (cmd === 'about') {
      newHistory.push('AXON X-TEMPLATE V2', 'Created by Ex2-Axon', 'Powered by React + Vite')
    } else {
      newHistory.push(`Unknown command: ${cmd}`)
    }
    
    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className="pixel-border bg-surface p-4 w-full max-w-md h-64 flex flex-col mt-8 mx-auto">
      <div className="flex justify-between border-b-2 border-primary mb-2 pb-1 text-xs">
        <span>AXON_TERMINAL.EXE</span>
        <span className="animate-pulse">● LIVE</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 text-sm space-y-1 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex border-t-2 border-primary pt-2">
        <span className="mr-2">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-primary placeholder:text-muted"
          placeholder="ENTER COMMAND..."
        />
      </form>
    </div>
  )
}

function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [count, setCount] = useState(0)

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-12 relative z-10 max-w-6xl mx-auto w-full">
      {/* ── Top Header ── */}
      <header className="flex justify-between items-start mb-12">
        <div className="pixel-border bg-surface p-2 px-4 text-xs">
          STATUS: <span className="text-primary animate-pulse">OK</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted mb-1">LOCAL_TIME</div>
          <div className="font-mono text-xl">{new Date().toLocaleTimeString()}</div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500 animate-pulse" />
          <img 
            src={heroImg} 
            className="relative w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            alt="Hero" 
          />
        </div>

        <div className="space-y-4 mb-12">
          <div className="text-xs md:text-sm tracking-[0.2em] text-accent mb-2">INITIALIZING CORE MODULES</div>
          <h1 className="text-4xl md:text-7xl glitch mb-4" data-text="SYSTEM BOOT">
            SYSTEM BOOT
          </h1>
          <div className="h-1 w-32 md:w-64 bg-primary mx-auto shadow-[0_0_15px_var(--primary)]" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-12 w-full">
          <button 
            onClick={() => setCount(c => c + 1)}
            className="pixel-button w-full md:w-auto min-w-[200px]"
          >
            ACTIVATE_ [{count}]
          </button>
          
          <div className="pixel-border bg-surface p-4 flex-1 w-full md:max-w-sm text-left">
            <h3 className="text-sm mb-2 text-accent">SYSTEM_LOGS</h3>
            <p className="text-sm font-mono opacity-80 leading-relaxed">
              // Neural link established<br/>
              // Encryption level: MAX<br/>
              // Buffer status: CLEAR
            </p>
          </div>
        </div>

        <Terminal />
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t-4 border-primary pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <div>© 2026 AXON TECHNOLOGIES. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors underline">DOCUMENTATION</a>
          <a href="#" className="hover:text-primary transition-colors underline">UPLINK_STATUS</a>
          <a href="#" className="hover:text-primary transition-colors underline">NETWORK_INFO</a>
        </div>
      </footer>
    </div>
  )
}

export default App
