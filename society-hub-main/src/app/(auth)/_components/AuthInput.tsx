'use client';

import React, { ReactNode, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: ReactNode;
    error?: string;
    success?: boolean;
    helperText?: string;
    showPasswordToggle?: boolean;
}

export default function AuthInput({
    label,
    icon,
    error,
    success,
    helperText,
    showPasswordToggle = false,
    type = 'text',
    className = '',
    id,
    ...props
}: AuthInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="space-y-2 group">
            <div className="flex items-center justify-between">
                <label
                    htmlFor={inputId}
                    className={`text-[10px] font-black uppercase tracking-widest ml-1 transition-colors ${error ? 'text-rose-600' : success ? 'text-emerald-600' : 'text-slate-500 group-focus-within:text-indigo-600'
                        }`}
                >
                    {label}
                </label>
                {helperText && !error && (
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{helperText}</span>
                )}
            </div>

            <div className="relative">
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-rose-500' : success ? 'text-emerald-600' : 'text-slate-400 group-focus-within:text-indigo-600'
                    }`}>
                    {icon}
                </div>

                <input
                    id={inputId}
                    type={inputType}
                    className={`w-full bg-slate-50 border rounded-2xl py-4 pl-14 pr-${isPassword && showPasswordToggle ? '14' : '6'} text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300 ${error
                            ? 'border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/50'
                            : success
                                ? 'border-emerald-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50'
                                : 'border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50'
                        } ${className}`}
                    {...props}
                />

                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-[9px] font-bold text-rose-600 uppercase tracking-wider mt-1 ml-1 animate-fadeIn">
                    {error}
                </p>
            )}
        </div>
    );
}