"use client"

import { X, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
} from "@/components/ui/dialog"

interface AIListeningModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AIListeningModal({ open, onOpenChange }: AIListeningModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-black/80" />
            <DialogContent className="border-none bg-transparent shadow-none p-0 max-w-full h-screen flex flex-col items-center justify-center">
                {/* Settings button in top right - matching uploaded image */}
                <div className="absolute top-6 right-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </Button>
                </div>

                {/* Vibrating Circle */}
                <div className="relative flex items-center justify-center mb-auto mt-auto">
                    {/* Outer pulse rings */}
                    <div className="absolute h-64 w-64 rounded-full border-2 border-white/20 animate-pulse-slow" />
                    <div className="absolute h-56 w-56 rounded-full border-2 border-white/30 animate-pulse-medium" />

                    {/* Main vibrating circle */}
                    <div className="relative h-44 w-44 rounded-full border-[3px] border-white/50 animate-vibrate">
                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />

                        {/* Dots around the circle */}
                        {Array.from({ length: 24 }).map((_, i) => {
                            const angle = (i * 360) / 24
                            const delay = (i * 50) / 1000
                            return (
                                <div
                                    key={i}
                                    className="absolute h-1.5 w-1.5 rounded-full bg-white/60 animate-dot-pulse"
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-88px)`,
                                        animationDelay: `${delay}s`,
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Bottom buttons - matching uploaded image layout */}
                <div className="flex items-center justify-center gap-20 mb-12">
                    {/* Cancel button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        className="h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    >
                        <X className="h-8 w-8" />
                        <span className="sr-only">Cancel</span>
                    </Button>

                    {/* Microphone button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    >
                        <Mic className="h-8 w-8" />
                        <span className="sr-only">Microphone</span>
                    </Button>
                </div>

                <style jsx>{`
          @keyframes vibrate {
            0%, 100% { transform: translate(0, 0) scale(1); }
            10% { transform: translate(-2px, -2px) scale(1.01); }
            20% { transform: translate(2px, 2px) scale(0.99); }
            30% { transform: translate(-2px, 2px) scale(1.01); }
            40% { transform: translate(2px, -2px) scale(0.99); }
            50% { transform: translate(-1px, 1px) scale(1); }
            60% { transform: translate(1px, -1px) scale(1.01); }
            70% { transform: translate(-1px, -1px) scale(0.99); }
            80% { transform: translate(1px, 1px) scale(1.01); }
            90% { transform: translate(-1px, 1px) scale(0.99); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
          }
          
          @keyframes pulse-medium {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.2; }
          }
          
          @keyframes dot-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          
          :global(.animate-vibrate) {
            animation: vibrate 1s ease-in-out infinite;
          }
          
          :global(.animate-pulse-slow) {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          
          :global(.animate-pulse-medium) {
            animation: pulse-medium 2.5s ease-in-out infinite;
          }
          
          :global(.animate-dot-pulse) {
            animation: dot-pulse 2s ease-in-out infinite;
          }
        `}</style>
            </DialogContent>
        </Dialog>
    )
}
