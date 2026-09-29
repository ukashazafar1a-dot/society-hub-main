'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, Lock, CheckCircle2, Smartphone, ArrowLeft, AlertCircle } from 'lucide-react';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import { AuthError, PasswordResetConfirm, PasswordStrength } from '@/src/utils/types';
import { calculatePasswordStrength, passwordStrengthConfig, passwordValidationRules, validatePassword } from './auth-data';

interface ResetPasswordFormProps {
    onSubmit: (data: PasswordResetConfirm) => void;
    onBack: () => void;
    isLoading?: boolean;
    error?: AuthError | null;
}

export default function ResetPasswordForm({
    onSubmit,
    onBack,
    isLoading = false,
    error = null
}: ResetPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');
    const [showRequirements, setShowRequirements] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        code?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    useEffect(() => {
        if (newPassword) {
            setPasswordStrength(calculatePasswordStrength(newPassword));
            setShowRequirements(true);
        } else {
            setShowRequirements(false);
        }
    }, [newPassword]);

    const passwordCriteria = validatePassword(newPassword);

    const validateForm = (): boolean => {
        const errors: {
            code?: string;
            newPassword?: string;
            confirmPassword?: string;
        } = {};

        if (!code) {
            errors.code = 'Recovery code is required';
        } else if (code.length < 6) {
            errors.code = 'Invalid recovery code format';
        }

        if (!newPassword) {
            errors.newPassword = 'New access key is required';
        } else {
            if (newPassword.length < passwordValidationRules.minLength) {
                errors.newPassword = `Must be at least ${passwordValidationRules.minLength} characters`;
            } else if (!/[A-Z]/.test(newPassword)) {
                errors.newPassword = 'Must contain uppercase letter';
            } else if (!/[a-z]/.test(newPassword)) {
                errors.newPassword = 'Must contain lowercase letter';
            } else if (!/[0-9]/.test(newPassword)) {
                errors.newPassword = 'Must contain number';
            } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
                errors.newPassword = 'Must contain special character';
            }
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your access key';
        } else if (confirmPassword !== newPassword) {
            errors.confirmPassword = 'Access keys do not match';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ email, code, newPassword, confirmPassword });
        }
    };

    const strengthConfig = passwordStrengthConfig[passwordStrength];

    return (
        <AuthCard maxWidth="md">
            <button
                onClick={onBack}
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900 transition-all flex items-center gap-2 mb-8 border border-slate-200 group"
                disabled={isLoading}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">BACK</span>
            </button>

            <div className="mb-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                    <KeyRound size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">
                    Cycle Reset
                </h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Provision a new high-entropy access key.
                </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 mb-6 animate-fadeIn">
                <Smartphone size={16} className="text-emerald-600" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                    Recovery Code Validated
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInput
                    label="Recovery Code"
                    placeholder="••••••"
                    icon={<Smartphone size={18} />}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    error={formErrors.code}
                    disabled={isLoading}
                    maxLength={6}
                />

                <div className="space-y-2">
                    <AuthInput
                        label="New Access Key"
                        placeholder="••••••••"
                        type="password"
                        icon={<Lock size={18} />}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={formErrors.newPassword}
                        disabled={isLoading}
                        showPasswordToggle
                        helperText={newPassword ? `${newPassword.length} chars` : undefined}
                    />

                    {showRequirements && (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 animate-fadeIn">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                    Key Strength
                                </span>
                                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider bg-${strengthConfig.color}-100 text-${strengthConfig.color}-700`}>
                                    {strengthConfig.label}
                                </span>
                            </div>

                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-${strengthConfig.color}-500 transition-all duration-300`}
                                    style={{ width: `${(strengthConfig.score / 4) * 100}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${passwordCriteria.minLength ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className={`text-[8px] font-bold ${passwordCriteria.minLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {passwordValidationRules.minLength}+ chars
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${passwordCriteria.hasUpperCase ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className={`text-[8px] font-bold ${passwordCriteria.hasUpperCase ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        Uppercase
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${passwordCriteria.hasLowerCase ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className={`text-[8px] font-bold ${passwordCriteria.hasLowerCase ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        Lowercase
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${passwordCriteria.hasNumbers ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className={`text-[8px] font-bold ${passwordCriteria.hasNumbers ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        Numbers
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${passwordCriteria.hasSpecialChar ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className={`text-[8px] font-bold ${passwordCriteria.hasSpecialChar ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        Special Char
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <AuthInput
                    label="Confirm Alignment"
                    placeholder="••••••••"
                    type="password"
                    icon={<CheckCircle2 size={18} />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={formErrors.confirmPassword}
                    disabled={isLoading}
                    showPasswordToggle
                />

                {error && (
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
                            <span>ENCRYPTING_KEY...</span>
                        </>
                    ) : (
                        'COMMIT_NEW_KEY'
                    )}
                </button>
            </form>
        </AuthCard>
    );
}