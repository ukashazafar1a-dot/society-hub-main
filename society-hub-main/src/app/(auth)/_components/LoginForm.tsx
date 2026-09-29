'use client';

import React, { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import { AuthError, LoginCredentials } from '@/src/utils/types';

interface LoginFormProps {
    onLogin: (credentials: LoginCredentials) => void;
    onForgotPassword: () => void;
    onRegister: () => void;
    isLoading?: boolean;
    error?: AuthError | null;
}

export default function LoginForm({
    onLogin,
    onForgotPassword,
    onRegister,
    isLoading = false,
    error = null
}: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    const validateForm = (): boolean => {
        const errors: { email?: string; password?: string } = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email format';
        }

        if (!password) {
            errors.password = 'Access key is required';
        } else if (password.length < 6) {
            errors.password = 'Access key must be at least 6 characters';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onLogin({ email, password, remember });
        }
    };

    return (
        <AuthCard maxWidth="md">
            <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                    <Building2 size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2 italic animate-slideIn">
                    Access Terminal
                </h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-fadeInUp animation-delay-100">
                    Authenticate to join your community node
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl animate-fadeIn">
                    <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest text-center">
                        {error.message}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInput
                    label="Network Identification (Email)"
                    placeholder="name@civichub.ai"
                    icon={<Mail size={18} />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={formErrors.email}
                    disabled={isLoading}
                    autoComplete="email"
                />

                <div className="space-y-2">
                    <AuthInput
                        label="Access Key"
                        placeholder="••••••••"
                        type="password"
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={formErrors.password}
                        disabled={isLoading}
                        autoComplete="current-password"
                        showPasswordToggle
                    />

                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors ml-1 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Reset_Access_Key?
                    </button>
                </div>

                <div className="flex items-center gap-3 ml-1 mb-2">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="remember"
                        className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                        Stay_Synchronized
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>ESTABLISHING_LINK...</span>
                        </>
                    ) : (
                        <>
                            <span className="ml-5">EXECUTE_LOGIN</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    New_To_CivicHub?
                </p>
                <button
                    onClick={onRegister}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors mt-2 underline decoration-indigo-200 underline-offset-4 disabled:opacity-50"
                    disabled={isLoading}
                >
                    Request_Community_Entry
                </button>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                <Shield size={12} />
                <span className="text-[8px] font-bold uppercase tracking-widest">SSL_SECURED</span>
            </div>
        </AuthCard>
    );
}