"use client"

/**
 * AI Listening Modal V2 - Uses Backend Agent with MCP Tools
 * 
 * Architecture:
 * 1. User speaks → Web Speech API (STT) → Transcript
 * 2. Transcript → Backend Agent API → Response (uses MCPs)
 * 3. Response → Web Speech Synthesis (TTS) → Audio output
 * 
 * This approach allows the voice agent to use all MCP tools
 * because the actual processing happens in the Python backend.
 */

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Mic, Volume2, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface AIListeningModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type AgentState = "idle" | "listening" | "processing" | "speaking"

// Check if browser supports speech recognition
const SpeechRecognition = typeof window !== 'undefined' 
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition 
    : null

export function AIListeningModalV2({ open, onOpenChange }: AIListeningModalProps) {
    const [state, setState] = useState<AgentState>("idle")
    const [transcript, setTranscript] = useState("")
    const [response, setResponse] = useState("")
    const [isSupported, setIsSupported] = useState(true)
    
    // Refs
    const recognitionRef = useRef<any>(null)
    const synthRef = useRef<SpeechSynthesis | null>(null)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    // Initialize speech synthesis
    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis
            setIsSupported(!!SpeechRecognition)
        }
    }, [])

    // Cleanup on close - IMPORTANT: Stop all processes
    useEffect(() => {
        if (!open) {
            // Stop speech recognition
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort()
                    recognitionRef.current.stop()
                } catch (e) {
                    // Ignore errors during cleanup
                }
                recognitionRef.current = null
            }
            // Stop speech synthesis
            if (synthRef.current) {
                synthRef.current.cancel()
            }
            // Reset state
            setState("idle")
            setTranscript("")
            setResponse("")
        }
        
        // Cleanup on unmount
        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort()
                    recognitionRef.current.stop()
                } catch (e) {}
                recognitionRef.current = null
            }
            if (synthRef.current) {
                synthRef.current.cancel()
            }
        }
    }, [open])

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            recognitionRef.current = null
        }
    }, [])

    const stopSpeaking = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel()
        }
    }, [])

    const speakResponse = useCallback((text: string) => {
        if (!synthRef.current) return

        setState("speaking")
        
        // Clean text for speech (remove markdown, ALL emojis, special chars)
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/`/g, '')
            .replace(/\n+/g, '. ')
            // Remove ALL emojis using Unicode ranges
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
            .replace(/[\u{2600}-\u{26FF}]/gu, '')
            .replace(/[\u{2700}-\u{27BF}]/gu, '')
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
            .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
            .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')
            .replace(/\s{2,}/g, ' ') // Clean up extra spaces
            .trim()

        const utterance = new SpeechSynthesisUtterance(cleanText)
        utterance.lang = 'es-ES' // Spanish
        utterance.rate = 1.0
        utterance.pitch = 1.1 // Slightly higher for feminine voice
        
        // Try to find a FEMALE Spanish voice
        const voices = synthRef.current.getVoices()
        const femaleVoice = voices.find(v => 
            v.lang.startsWith('es') && 
            (v.name.toLowerCase().includes('female') || 
             v.name.toLowerCase().includes('woman') ||
             v.name.toLowerCase().includes('helena') ||
             v.name.toLowerCase().includes('laura') ||
             v.name.toLowerCase().includes('mónica') ||
             v.name.toLowerCase().includes('monica') ||
             v.name.toLowerCase().includes('elvira') ||
             v.name.toLowerCase().includes('sabina') ||
             v.name.toLowerCase().includes('lucia') ||
             v.name.toLowerCase().includes('paulina') ||
             v.name.includes('Microsoft Helena') ||
             v.name.includes('Microsoft Sabina') ||
             v.name.includes('Google español'))
        ) || voices.find(v => v.lang.startsWith('es'))
        
        if (femaleVoice) {
            utterance.voice = femaleVoice
            console.log("🎙️ Using voice:", femaleVoice.name)
        }

        utterance.onend = () => {
            setState("listening")
            startListening() // Continue listening after speaking
        }

        utterance.onerror = (e) => {
            console.error("Speech synthesis error:", e)
            setState("listening")
            startListening()
        }

        utteranceRef.current = utterance
        synthRef.current.speak(utterance)
    }, [])

    const processWithAgent = useCallback(async (text: string) => {
        setState("processing")
        setTranscript(text)
        console.log("🎤 [VOICE V2] Processing:", text)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    user_id: 'voice_user',
                    session_id: 'voice_session'
                })
            })

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`)
            }

            // Handle SSE stream
            const reader = res.body?.getReader()
            if (!reader) throw new Error("No response body")

            const decoder = new TextDecoder()
            let fullResponse = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6))
                            if (data.text) {
                                fullResponse = data.text
                                setResponse(data.text)
                            }
                        } catch (e) {
                            // Ignore parse errors for incomplete chunks
                        }
                    }
                }
            }

            console.log("🤖 [VOICE V2] Agent response:", fullResponse.slice(0, 100))
            
            if (fullResponse) {
                speakResponse(fullResponse)
            } else {
                setState("listening")
                startListening()
            }

        } catch (error) {
            console.error("Agent API error:", error)
            toast.error("Error al procesar tu mensaje")
            setState("listening")
            startListening()
        }
    }, [speakResponse])

    const startListening = useCallback(() => {
        if (!SpeechRecognition) {
            toast.error("Tu navegador no soporta reconocimiento de voz")
            return
        }

        stopListening()
        stopSpeaking()

        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'es-ES' // Spanish

        recognition.onstart = () => {
            setState("listening")
            console.log("🎤 [VOICE V2] Listening started")
        }

        recognition.onresult = (event: any) => {
            const results = event.results
            const lastResult = results[results.length - 1]
            
            if (lastResult.isFinal) {
                const text = lastResult[0].transcript
                console.log("🎤 [VOICE V2] Final transcript:", text)
                processWithAgent(text)
            } else {
                // Show interim results
                setTranscript(lastResult[0].transcript)
            }
        }

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error)
            if (event.error !== 'no-speech') {
                toast.error(`Error de reconocimiento: ${event.error}`)
            }
            setState("idle")
        }

        recognition.onend = () => {
            // Only restart if we're still in listening state
            if (state === "listening") {
                console.log("🎤 [VOICE V2] Recognition ended, restarting...")
                // Small delay before restarting
                setTimeout(() => {
                    if (state === "listening") {
                        startListening()
                    }
                }, 100)
            }
        }

        recognitionRef.current = recognition
        recognition.start()
    }, [state, processWithAgent, stopListening, stopSpeaking])

    const handleMainButtonClick = () => {
        if (state === "idle") {
            startListening()
        } else {
            stopListening()
            stopSpeaking()
            setState("idle")
        }
    }

    // Visual helpers
    const getCircleColor = () => {
        switch (state) {
            case "listening": return "border-teal-400"
            case "processing": return "border-orange-400"
            case "speaking": return "border-purple-400"
            default: return "border-white/50"
        }
    }

    const getStatusText = () => {
        switch (state) {
            case "listening": return "Escuchando..."
            case "processing": return "Procesando..."
            case "speaking": return "Hablando..."
            default: return "Toca para hablar"
        }
    }

    if (!isSupported) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
                <DialogContent className="border-none bg-transparent shadow-none p-0 flex flex-col items-center justify-center">
                    <DialogTitle className="sr-only">Voz no soportada</DialogTitle>
                    <DialogDescription className="sr-only">Tu navegador no soporta reconocimiento de voz</DialogDescription>
                    <div className="text-white text-center p-8">
                        <p className="text-xl mb-4">⚠️ Navegador no compatible</p>
                        <p className="text-white/60">Tu navegador no soporta reconocimiento de voz.</p>
                        <p className="text-white/60">Por favor usa Chrome, Edge o Safari.</p>
                        <Button onClick={() => onOpenChange(false)} className="mt-6">Cerrar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
            <DialogContent className="border-none bg-transparent shadow-none p-0 max-w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                <DialogTitle className="sr-only">Lyo Voice Agent</DialogTitle>
                <DialogDescription className="sr-only">
                    Interfaz de voz para Lyo Agent. Habla para interactuar con tus correos, calendario y contactos.
                </DialogDescription>
                
                {/* Response Display */}
                <div className="absolute top-20 w-full px-8 text-center space-y-4">
                    {transcript && state !== "speaking" && (
                        <p className="text-lg font-medium text-teal-200 animate-in fade-in">
                            "{transcript}"
                        </p>
                    )}
                    {response && state === "speaking" && (
                        <p className="text-lg font-medium text-purple-200 animate-in fade-in slide-in-from-bottom-4 line-clamp-6 max-w-2xl mx-auto">
                            {response}
                        </p>
                    )}
                </div>

                {/* Main Visualizer */}
                <div className="relative flex items-center justify-center mb-auto mt-auto">
                    {/* Status Text */}
                    <div className="absolute -top-16 text-white/60 uppercase tracking-widest text-sm font-medium flex flex-col items-center gap-2">
                        {getStatusText()}
                        <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                            🔧 MCP Tools Active
                        </span>
                    </div>

                    {/* Outer pulse rings */}
                    <div className={`absolute h-64 w-64 rounded-full border-2 ${state === 'listening' ? 'animate-pulse-slow border-teal-500/30' : 'border-white/10'}`} />
                    <div className={`absolute h-56 w-56 rounded-full border-2 ${state === 'listening' ? 'animate-pulse-medium border-teal-500/40' : 'border-white/20'}`} />

                    {/* Main vibrating circle */}
                    <div 
                        className={`relative h-44 w-44 rounded-full border-[3px] transition-colors duration-500 ${getCircleColor()} ${state === 'speaking' ? 'animate-vibrate' : ''} flex items-center justify-center cursor-pointer`}
                        onClick={handleMainButtonClick}
                    >
                        {/* Inner glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br transition-colors duration-500 ${
                            state === 'listening' ? 'from-teal-500/20' :
                            state === 'processing' ? 'from-orange-500/20' :
                            state === 'speaking' ? 'from-purple-500/20' :
                            'from-white/10'
                        } to-transparent`} />

                        {/* Icon */}
                        {state === 'processing' ? (
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-8 w-8 text-orange-300 animate-pulse" />
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            </div>
                        ) : state === 'speaking' ? (
                            <Volume2 className="h-12 w-12 text-white animate-pulse" />
                        ) : (
                            <Mic className={`h-12 w-12 text-white ${state === 'listening' ? 'animate-pulse' : ''}`} />
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-12 mb-16">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        className="h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                    >
                        <X className="h-8 w-8" />
                    </Button>
                </div>

                <style jsx>{`
          @keyframes vibrate {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.05); }
            50% { transform: scale(0.95); }
            75% { transform: scale(1.02); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
          }
          
          @keyframes pulse-medium {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.2; }
          }
          
          :global(.animate-vibrate) {
            animation: vibrate 0.5s ease-in-out infinite;
          }
          
          :global(.animate-pulse-slow) {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          
          :global(.animate-pulse-medium) {
            animation: pulse-medium 2.5s ease-in-out infinite;
          }
        `}</style>
            </DialogContent>
        </Dialog>
    )
}
