'use client';

import React, { ReactNode } from 'react';

interface AuthCardProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AuthCard({ children, className = '', maxWidth = 'md' }: AuthCardProps) {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div className={`w-full ${maxWidthClasses[maxWidth]} z-10 animate-fadeIn`}>
            <div className={`quartz-card p-10 md:p-12 rounded-[3rem] border-slate-200 bg-white/90 backdrop-blur-3xl shadow-2xl ${className}`}>
                {children}
            </div>
        </div>
    );
}