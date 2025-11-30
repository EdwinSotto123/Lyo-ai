'use client';

import { cn } from '@/components/classNames';
import { motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';

interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: any;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
}

export function AnimatedGridPattern({
    width = 70,
    height = 70,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    className,
    maxOpacity = 0.4,
    duration = 4,
    repeatDelay = 0.5,
    ...props
}: AnimatedGridPatternProps) {
    const id = useId();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [squares, setSquares] = useState<{ id: number; x: number; y: number }[]>([]);

    const getPos = () => {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ];
    };

    const generateSquares = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: getPos()[0],
            y: getPos()[1],
        }));
    };

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            setSquares(generateSquares(numSquares));
        }
    }, [dimensions, numSquares]);

    return (
        <div className={cn('pointer-events-none absolute inset-0 h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]', className)} {...props}>
            <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full fill-neutral-400/30 stroke-neutral-400/30 dark:fill-neutral-800/30 dark:stroke-neutral-800/30"
            >
                <defs>
                    <pattern
                        id={id}
                        width={width}
                        height={height}
                        patternUnits="userSpaceOnUse"
                        x={x}
                        y={y}
                    >
                        <path
                            d={`M.5 ${height}V.5H${width}`}
                            fill="none"
                            strokeDasharray={strokeDasharray}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(({ x, y, id: squareId }) => (
                        <motion.rect
                            initial={{ opacity: 0 }}
                            animate={{ opacity: maxOpacity }}
                            transition={{
                                duration,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                repeatType: 'reverse',
                            }}
                            onAnimationComplete={() => {
                                const [newX, newY] = getPos();
                                setSquares((currentSquares) =>
                                    currentSquares.map((s) =>
                                        s.id === squareId ? { ...s, x: newX, y: newY } : s,
                                    ),
                                );
                            }}
                            key={`${x}-${y}-${squareId}`}
                            width={width - 1}
                            height={height - 1}
                            x={x * width + 1}
                            y={y * height + 1}
                            fill="currentColor"
                            strokeWidth="0"
                        />
                    ))}
                </svg>
            </svg>
        </div>
    );
}
