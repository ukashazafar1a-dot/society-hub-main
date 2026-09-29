'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mail, Shield, AlertCircle } from 'lucide-react';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import { authMessages, emailRegex } from './auth-data';
import { AuthError, PasswordResetRequest } from '@/src/utils/types';

interface ForgotPasswordFormProps {
    onSubmit: (data: PasswordResetRequest) => void;
    onBack: () => void;
    isLoading?: boolean;
    error?: AuthError | null;
    success?: boolean;
}

export default function ForgotPasswordForm({
    onSubmit,
    onBack,
    isLoading = false,
    error = null,
    success = false
}: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const validateForm = (): boolean => {
        if (!email) {
            setFormError('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            setFormError('Invalid email format');
            return false;
        }
        setFormError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ email });
        }
    };

    return (
        <AuthCard maxWidth="md">
            <button
                onClick={onBack}
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900 transition-all flex items-center gap-2 mb-8 border border-slate-200 group"
                disabled={isLoading}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">ABORT</span>
            </button>

            <div className="mb-10">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                    <Shield size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2 italic">
                    Key Recovery
                </h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                    Initiate recovery protocol via your registered identification node.
                </p>
            </div>

            {success ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Mail size={16} className="text-emerald-600" />
                        </div>
                        <h3 className="text-sm font-black text-emerald-700 uppercase tracking-tight">
                            Recovery Code Sent
                        </h3>
                    </div>
                    <p className="text-[10px] font-medium text-emerald-600 mb-2">
                        {authMessages.reset.codeSent}
                    </p>
                    <p className="text-[9px] text-emerald-500">
                        Check your email for the recovery code. The code will expire in 15 minutes.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <AuthInput
                        label="Identification Node (Email)"
                        placeholder="name@civichub.ai"
                        icon={<Mail size={18} />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={formError || error?.message}
                        disabled={isLoading}
                        autoComplete="email"
                    />

                    {error && !formError && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2">
                            <AlertCircle size={16} className="text-rose-600" />
                            <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-indigo-500/20"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>SEARCHING_REGISTRY...</span>
                            </>
                        ) : (
                            'TRANSMIT_RECOVERY_CODE'
                        )}
                    </button>
                </form>
            )}

            <div className="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">
                    Note: If you no longer have access to this email, contact the Society Administrative Node physically.
                </p>
            </div>
        </AuthCard>
    );
}