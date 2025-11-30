"use client"

import { useState } from "react"
import { Mic, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function AgentsPage() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        {
            role: "assistant",
            content: "¡Hola! Soy tu agente de IA. ¿En qué puedo ayudarte hoy?",
        },
    ])

    const handleSend = () => {
        if (!input.trim()) return

        setMessages([...messages, { role: "user", content: input }])
        setInput("")

        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Estoy procesando tu solicitud...",
                },
            ])
        }, 500)
    }

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-border px-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-teal-400">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 animate-pulse" >
                            <Image
                                src="/logo-lyo.webp"   // 👉 ruta de tu imagen
                                alt="Lyo"
                                width={50}             // 👉 ajusta tamaño
                                height={35}
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">AI Agent</h1>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24 md:pb-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                ? "bg-gradient-to-br from-orange-400 to-teal-400 text-white"
                                : "bg-muted text-foreground"
                                }`}
                        >
                            <p className="text-sm">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:relative md:bottom-0">
                <div className="mx-auto max-w-3xl">
                    <div className="relative flex items-center gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                            placeholder="Pregunta lo que quieras..."
                            className="flex-1 pr-20 rounded-full bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-orange-400"
                        />
                        <div className="absolute right-2 flex items-center gap-1">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full hover:bg-muted"
                            >
                                <Mic className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={handleSend}
                                className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 hover:from-orange-500 hover:to-teal-500"
                            >
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 animate-pulse">
                                    <Sparkles className="h-3 w-3 text-white" />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
