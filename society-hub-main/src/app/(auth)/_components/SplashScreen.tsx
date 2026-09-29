'use client';

import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
    duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= duration) {
                clearInterval(timer);
                setIsVisible(false);
                setTimeout(onComplete, 300); // Wait for fade out animation
            }
        }, 16);

        return () => clearInterval(timer);
    }, [duration, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="text-center z-10 animate-fadeIn">
            <div className="relative">
                <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 mx-auto mb-8 animate-float">
                    <Shield size={48} className="text-white" />
                </div>

                {/* Progress Ring */}
                <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r="46"
                        fill="none"
                        stroke="#e0e7ff"
                        strokeWidth="2"
                        className="opacity-30"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r="46"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="2"
                        strokeDasharray={289.03}
                        strokeDashoffset={289.03 - (289.03 * progress) / 100}
                        className="transition-all duration-300"
                    />
                </svg>
            </div>

            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2 uppercase italic underline decoration-indigo-500 decoration-4 underline-offset-8 animate-slideIn">
                Society Management System
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs animate-fadeInUp animation-delay-200">
                Modern_Management_Suite
            </p>

            <div className="mt-12 flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                    />
                ))}
            </div>

            <div className="mt-8 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                Initializing Secure Connection...
            </div>
        </div>
    );
}