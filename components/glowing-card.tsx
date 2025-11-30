import React from "react";
import { cn } from "@/components/classNames";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    backgroundColor?: string;
    borderColor?: string;
    glowColor?: string;
    dotColor?: string;
}

export const GlowingCard = ({
    children,
    className,
    backgroundColor = '#022c22',
    borderColor = 'rgba(16, 185, 129, 0.5)',
    glowColor = 'rgba(16, 185, 129, 0.3)',
    dotColor = '#10b981',
    ...props
}: GlowingCardProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl",
                className
            )}
            style={{
                backgroundColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor,
                boxShadow: `0 0 40px -10px ${glowColor}`
            }}
            {...props}
        >
            {/* Luminescence on top border */}
            <div
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{
                    background: `linear-gradient(to right, transparent, ${borderColor}, transparent)`,
                    boxShadow: `0 0 20px 2px ${glowColor}`
                }}
            />

            {/* Dot pattern */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
