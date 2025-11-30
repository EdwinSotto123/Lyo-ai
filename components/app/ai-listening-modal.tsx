"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Mic, MicOff, Volume2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { GoogleGenAI } from "@google/genai"
import { createPcmBlob, decodeAudioData, decodeBase64 } from "@/lib/audio-utils"

// Define Modality enum locally if not exported or use string literal with type assertion if needed
// But better to try importing it if available, or just use the string "AUDIO" in an array
// The error says: Type 'string' is not assignable to type 'Modality[]'
// So it expects an array.

interface AIListeningModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type AgentState = "idle" | "connecting" | "listening" | "speaking"

export function AIListeningModal({ open, onOpenChange }: AIListeningModalProps) {
    const [state, setState] = useState<AgentState>("idle")
    const [transcript, setTranscript] = useState("")
    const [response, setResponse] = useState("")
    const [tools, setTools] = useState<any[]>([])
    
    // Fetch tools on mount/open
    useEffect(() => {
        if (open) {
            fetch('/api/tools')
                .then(res => {
                    if (!res.ok) throw new Error(res.statusText)
                    return res.json()
                })
                .then(data => {
                    if (data.tools) {
                        console.log("🔧 Tools loaded:", data.tools.length)
                        setTools(data.tools)
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch tools", err)
                    toast.error("Failed to load agent tools. Voice agent will have limited capabilities.")
                })
        }
    }, [open])
    
    // Audio Refs
    const inputContextRef = useRef<AudioContext | null>(null)
    const outputContextRef = useRef<AudioContext | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const processorRef = useRef<ScriptProcessorNode | null>(null)
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
    const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set())
    const nextStartTimeRef = useRef<number>(0)
    
    // Session Refs
    const sessionPromiseRef = useRef<Promise<any> | null>(null)

    const cleanupAudio = useCallback(() => {
        // Stop all playing sources
        activeSourcesRef.current.forEach(source => {
            try { source.stop() } catch (e) {}
        })
        activeSourcesRef.current.clear()

        // Disconnect inputs
        if (processorRef.current) {
            processorRef.current.disconnect()
            processorRef.current.onaudioprocess = null
            processorRef.current = null
        }
        if (sourceRef.current) {
            sourceRef.current.disconnect()
            sourceRef.current = null
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
        
        // Close contexts
        if (inputContextRef.current) {
            inputContextRef.current.close()
            inputContextRef.current = null
        }
        if (outputContextRef.current) {
            outputContextRef.current.close()
            outputContextRef.current = null
        }

        // Close session
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => {
                try { session.close() } catch (e) {}
            }).catch(() => {})
            sessionPromiseRef.current = null
        }
    }, [])

    const connectToGemini = async () => {
        try {
            setState("connecting")
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
            if (!apiKey) {
                throw new Error("Gemini API Key not found")
            }

            // 1. Initialize Audio Contexts
            const InputContextClass = (window.AudioContext || (window as any).webkitAudioContext)
            const inputCtx = new InputContextClass({ sampleRate: 16000 })
            const outputCtx = new InputContextClass({ sampleRate: 24000 })
            
            inputContextRef.current = inputCtx
            outputContextRef.current = outputCtx
            
            await inputCtx.resume()
            await outputCtx.resume()

            // 2. Get Microphone Stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream

            // 3. Setup GenAI Client
            const ai = new GoogleGenAI({ apiKey })
            
            // 4. Configure Session with Callbacks
            console.log("🔌 [VOICE AGENT] Connecting to Gemini Live with tools:", tools.length)
            if (tools.length > 0) {
                console.log("   - First tool:", tools[0].name)
            }

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    tools: tools.length > 0 ? [{ functionDeclarations: tools }] : undefined,
                    responseModalities: ["AUDIO" as any],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }
                    },
                    systemInstruction: {
                        parts: [{ text: "You are Lyo, a helpful AI assistant. You have access to tools to manage emails, calendar, and contacts. You MUST use these tools when the user asks for information about their emails, schedule, or contacts. Do not make up information. If you need to use a tool, do it immediately. Keep your responses short and natural for voice conversation." }]
                    }
                },
                callbacks: {
                    onopen: () => {
                        console.log("✅ [VOICE AGENT] Connected to Gemini Live")
                        setState("listening")
                    },
                    onmessage: async (msg: any) => {
                        // Handle Audio Output
                        const parts = msg.serverContent?.modelTurn?.parts || []
                        
                        for (const part of parts) {
                            if (part.inlineData?.data && outputContextRef.current) {
                                setState("speaking")
                                const audioData = decodeBase64(part.inlineData.data)
                                const buffer = await decodeAudioData(audioData, outputContextRef.current)
                                playAudio(buffer, outputContextRef.current)
                            }
                            
                            if (part.text) {
                                console.log("📝 [VOICE AGENT] Text response:", part.text)
                                setResponse(prev => prev + part.text)
                            }

                            // Handle Tool Call
                            if (part.toolCall) {
                                const call = part.toolCall
                                console.log("🛠️ [VOICE AGENT] Tool Call Request:", call.functionCalls[0].name)
                                console.log("   - Args:", call.functionCalls[0].args)
                                
                                for (const fc of call.functionCalls) {
                                    try {
                                        console.log(`🚀 [VOICE AGENT] Sending execution request for ${fc.name}...`)
                                        const res = await fetch('/api/tools/execute', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                name: fc.name,
                                                args: fc.args
                                            })
                                        })
                                        
                                        if (!res.ok) {
                                            throw new Error(`Server error: ${res.statusText}`)
                                        }
                                        
                                        const resultData = await res.json()
                                        console.log("✅ [VOICE AGENT] Tool Execution Result:", resultData)
                                        
                                        // Send response back to Gemini
                                        const session = await sessionPromiseRef.current
                                        if (session) {
                                            console.log("📤 [VOICE AGENT] Sending tool response back to Gemini Live")
                                            session.send({
                                                clientContent: {
                                                    turns: [{
                                                        role: "user",
                                                        parts: [{
                                                            toolResponse: {
                                                                functionResponses: [{
                                                                    response: { result: resultData.result },
                                                                    id: fc.id
                                                                }]
                                                            }
                                                        }]
                                                    }],
                                                    turnComplete: true
                                                }
                                            })
                                        }
                                    } catch (e) {
                                        console.error("❌ [VOICE AGENT] Tool execution failed", e)
                                        toast.error(`Failed to execute tool ${fc.name}`)
                                    }
                                }
                            }
                        }

                        if (msg.serverContent?.turnComplete) {
                            setState("listening")
                        }
                    },
                    onclose: () => {
                        console.log("🔌 [VOICE AGENT] Disconnected")
                        setState("idle")
                    },
                    onerror: (err: any) => {
                        console.error("Gemini Live Error:", err)
                        toast.error("Connection error")
                        setState("idle")
                    }
                }
            })
            
            sessionPromiseRef.current = sessionPromise

            // 5. Setup Audio Input Processing
            const source = inputCtx.createMediaStreamSource(stream)
            const processor = inputCtx.createScriptProcessor(4096, 1, 1)
            
            processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0)
                const blob = createPcmBlob(inputData)
                
                // Send audio to Gemini
                sessionPromise.then(session => {
                    session.sendRealtimeInput({ media: blob })
                })
            }

            source.connect(processor)
            processor.connect(inputCtx.destination)
            
            sourceRef.current = source
            processorRef.current = processor

        } catch (error) {
            console.error("Connection error:", error)
            toast.error("Failed to connect to Gemini Live")
            setState("idle")
            cleanupAudio()
        }
    }

    const playAudio = (buffer: AudioBuffer, ctx: AudioContext) => {
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        
        const now = ctx.currentTime
        // Schedule next chunk
        const startTime = Math.max(now, nextStartTimeRef.current)
        source.start(startTime)
        nextStartTimeRef.current = startTime + buffer.duration

        source.onended = () => {
            activeSourcesRef.current.delete(source)
            if (activeSourcesRef.current.size === 0) {
                // If no more audio playing, we might be back to listening
                // But Gemini Live is full duplex, so we are always listening
            }
        }
        activeSourcesRef.current.add(source)
    }

    // Auto-start when opened
    useEffect(() => {
        if (open && state === "idle") {
            connectToGemini()
        } else if (!open) {
            cleanupAudio()
            setState("idle")
            setTranscript("")
            setResponse("")
        }
    }, [open])

    // Cleanup on unmount
    useEffect(() => {
        return () => cleanupAudio()
    }, [])

    // Visual helpers
    const getCircleColor = () => {
        switch (state) {
            case "listening": return "border-teal-400"
            case "connecting": return "border-orange-400"
            case "speaking": return "border-purple-400"
            default: return "border-white/50"
        }
    }

    const getStatusText = () => {
        switch (state) {
            case "listening": return "Escuchando..."
            case "connecting": return "Conectando..."
            case "speaking": return "Hablando..."
            default: return "Toque para hablar"
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
            <DialogContent className="border-none bg-transparent shadow-none p-0 max-w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                <DialogTitle className="sr-only">Lyo Voice Agent</DialogTitle>
                <DialogDescription className="sr-only">
                    Voice interface for Lyo Agent. Speak to interact with your emails, calendar, and contacts.
                </DialogDescription>
                
                {/* Transcript Display */}
                <div className="absolute top-20 w-full px-8 text-center space-y-4">
                    {response && (
                        <p className="text-lg font-medium text-purple-200 animate-in fade-in slide-in-from-bottom-4 line-clamp-4">
                            {response}
                        </p>
                    )}
                </div>

                {/* Main Visualizer */}
                <div className="relative flex items-center justify-center mb-auto mt-auto">
                    {/* Status Text */}
                    <div className="absolute -top-16 text-white/60 uppercase tracking-widest text-sm font-medium flex flex-col items-center gap-2">
                        {getStatusText()}
                        {tools.length > 0 && (
                            <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                                {tools.length} Tools Active
                            </span>
                        )}
                    </div>

                    {/* Outer pulse rings */}
                    <div className={`absolute h-64 w-64 rounded-full border-2 ${state === 'listening' ? 'animate-pulse-slow border-teal-500/30' : 'border-white/10'}`} />
                    <div className={`absolute h-56 w-56 rounded-full border-2 ${state === 'listening' ? 'animate-pulse-medium border-teal-500/40' : 'border-white/20'}`} />

                    {/* Main vibrating circle */}
                    <div 
                        className={`relative h-44 w-44 rounded-full border-[3px] transition-colors duration-500 ${getCircleColor()} ${state === 'speaking' ? 'animate-vibrate' : ''} flex items-center justify-center cursor-pointer`}
                        onClick={state === 'idle' ? connectToGemini : cleanupAudio}
                    >
                        {/* Inner glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br transition-colors duration-500 ${
                            state === 'listening' ? 'from-teal-500/20' :
                            state === 'connecting' ? 'from-orange-500/20' :
                            state === 'speaking' ? 'from-purple-500/20' :
                            'from-white/10'
                        } to-transparent`} />

                        {/* Icon */}
                        {state === 'connecting' ? (
                            <Loader2 className="h-12 w-12 text-white animate-spin" />
                        ) : state === 'speaking' ? (
                            <Volume2 className="h-12 w-12 text-white" />
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
