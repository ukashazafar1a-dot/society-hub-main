'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import AuthCard from './AuthCard';

interface SuccessScreenProps {
    title?: string;
    message?: string;
    buttonText?: string;
    onContinue: () => void;
}

export default function SuccessScreen({
    title = 'Key Re-Synced',
    message = 'Registry Node Updated Successfully',
    buttonText = 'RETURN_TO_TERMINAL',
    onContinue
}: SuccessScreenProps) {
    return (
        <AuthCard maxWidth="md" className="text-center">
            <div className="relative">
                {/* Animated Checkmark */}
                <div className="relative w-24 h-24 mx-auto mb-10">
                    <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] animate-ping opacity-20"></div>
                    <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] animate-pulse opacity-40"></div>
                    <div className="relative w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-float">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-4 animate-slideIn">
                    {title}
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12 animate-fadeInUp animation-delay-100">
                    {message}
                </p>

                <button
                    onClick={onContinue}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                    <span>{buttonText}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Security Badge */}
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                    <Shield size={12} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">END_TO_END_ENCRYPTED</span>
                </div>
            </div>
        </AuthCard>
    );
}