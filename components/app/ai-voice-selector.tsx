"use client"

/**
 * AI Voice Modal Selector
 * 
 * Muestra opciones para elegir entre dos modos de voz:
 * 1. Modo Estable (V2) - Usa Backend + MCPs
 * 2. Modo Beta (Gemini Live) - Experiencia conversacional nativa
 */

import { useState } from "react"
import { Shield, FlaskConical, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { AIListeningModalV2 } from "./ai-listening-modal-v2"
import { AIListeningModal } from "./ai-listening-modal"

interface AIVoiceSelectorProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type SelectedMode = null | "stable" | "beta"

export function AIVoiceSelector({ open, onOpenChange }: AIVoiceSelectorProps) {
    const [selectedMode, setSelectedMode] = useState<SelectedMode>(null)

    const handleClose = () => {
        setSelectedMode(null)
        onOpenChange(false)
    }

    const handleBack = () => {
        setSelectedMode(null)
    }

    // If a mode is selected, show that modal
    if (selectedMode === "stable") {
        return (
            <AIListeningModalV2 
                open={open} 
                onOpenChange={(isOpen) => {
                    if (!isOpen) handleBack()
                }} 
            />
        )
    }

    if (selectedMode === "beta") {
        return (
            <AIListeningModal 
                open={open} 
                onOpenChange={(isOpen) => {
                    if (!isOpen) handleBack()
                }} 
            />
        )
    }

    // Selection screen
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/95 backdrop-blur-md" />
            <DialogContent className="border-none bg-transparent shadow-none p-0 max-w-md flex flex-col items-center justify-center">
                <DialogTitle className="sr-only">Seleccionar Modo de Voz</DialogTitle>
                <DialogDescription className="sr-only">
                    Elige entre el modo estable o el modo beta con Gemini Live
                </DialogDescription>

                {/* Close button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-white transition-all"
                >
                    <X className="h-6 w-6" />
                </Button>

                {/* Logo/Icon */}
                <div className="mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-1 animate-pulse">
                        <div className="h-full w-full rounded-full bg-black/80 flex items-center justify-center">
                            <span className="text-3xl">🎤</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Asistente de Voz
                    </h2>
                    <p className="text-white/50 text-sm">
                        Elige cómo quieres conversar
                    </p>
                </div>

                {/* Mode selection buttons - Vertical stack */}
                <div className="flex flex-col gap-4 w-full px-6">
                    
                    {/* Stable Mode Button */}
                    <button
                        onClick={() => setSelectedMode("stable")}
                        className="group relative w-full flex items-center gap-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/5 border border-teal-500/30 hover:border-teal-400 hover:from-teal-500/20 hover:to-emerald-500/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/10"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
                            <Shield className="h-7 w-7 text-white" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="text-lg font-semibold text-white">
                                    Modo Completo
                                </h3>
                                <span className="text-[10px] bg-teal-500/30 text-teal-300 px-2 py-0.5 rounded-full font-medium">
                                    RECOMENDADO
                                </span>
                            </div>
                            <p className="text-sm text-white/50">
                                Gmail, Calendario, Contactos y más
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 text-white/30 group-hover:text-teal-400 group-hover:translate-x-1 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>

                    {/* Beta Mode Button */}
                    <button
                        onClick={() => setSelectedMode("beta")}
                        className="group relative w-full flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/5 border border-blue-500/20 hover:border-blue-400 hover:from-blue-500/15 hover:to-purple-500/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                            <FlaskConical className="h-7 w-7 text-white" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="text-lg font-semibold text-white">
                                    Modo Experimental
                                </h3>
                                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-medium">
                                    BETA
                                </span>
                            </div>
                            <p className="text-sm text-white/50">
                                Gemini Live - Conversación fluida
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-[11px] text-white/30 mt-8 text-center px-8">
                    Toca un modo para empezar a hablar con Lyo
                </p>
            </DialogContent>
        </Dialog>
    )
}
