'use client';

import React, { useState, useEffect } from 'react';

import BackgroundDecor from './BackgroundDecor';
import SplashScreen from './SplashScreen';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import SuccessScreen from './SuccessScreen';
import { AuthError, AuthState, LoginCredentials, PasswordResetConfirm, PasswordResetRequest } from '@/src/utils/types';
import { authMessages, mockUsers } from './auth-data';

interface AuthFlowProps {
    onLoginSuccess: () => void;
    initialStep?: AuthState;
}

export default function AuthFlow({ onLoginSuccess, initialStep = 'splash' }: AuthFlowProps) {
    const [step, setStep] = useState<AuthState>(initialStep);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);
    const [resetEmail, setResetEmail] = useState<string>('');
    const [resetSuccess, setResetSuccess] = useState(false);

    // Auto-transition from splash to login
    useEffect(() => {
        if (step === 'splash') {
            const timer = setTimeout(() => setStep('login'), 2500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Reset error when step changes
    useEffect(() => {
        setError(null);
    }, [step]);

    const handleLogin = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock authentication
        const user = mockUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

        if (user && user.password === credentials.password) {
            // Store auth token in localStorage (mock)
            localStorage.setItem('auth_token', `mock_token_${user.id}`);
            localStorage.setItem('user', JSON.stringify(user));

            onLoginSuccess();
        } else {
            setError({
                message: authMessages.login.invalid
            });
        }

        setIsLoading(false);
    };

    const handleForgotPassword = async (data: PasswordResetRequest) => {
        setIsLoading(true);
        setError(null);
        setResetSuccess(false);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Check if email exists
        const user = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());

        if (user) {
            setResetEmail(data.email);
            setResetSuccess(true);
            // In a real app, you'd send an email here
            console.log(`Recovery code sent to ${data.email}`);
        } else {
            setError({
                message: authMessages.login.notFound
            });
        }

        setIsLoading(false);
    };

    const handleResetPassword = async (data: PasswordResetConfirm) => {
        setIsLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Mock password reset
        if (data.newPassword === data.confirmPassword) {
            // In a real app, you'd update the password in the database
            console.log(`Password reset for ${data.email || resetEmail}`);
            setStep('success');
        } else {
            setError({
                field: 'confirmPassword',
                message: authMessages.register.passwordMismatch
            });
        }

        setIsLoading(false);
    };

    const handleRegister = () => {
        // Navigate to registration flow
        console.log('Navigate to registration');
    };

    const handleBackToLogin = () => {
        setStep('login');
        setError(null);
        setResetSuccess(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            <BackgroundDecor />

            {step === 'splash' && (
                <SplashScreen onComplete={() => setStep('login')} />
            )}

            {step === 'login' && (
                <LoginForm
                    onLogin={handleLogin}
                    onForgotPassword={() => setStep('forgot')}
                    onRegister={handleRegister}
                    isLoading={isLoading}
                    error={error}
                />
            )}

            {step === 'forgot' && (
                <ForgotPasswordForm
                    onSubmit={handleForgotPassword}
                    onBack={handleBackToLogin}
                    isLoading={isLoading}
                    error={error}
                    success={resetSuccess}
                />
            )}

            {step === 'reset' && (
                <ResetPasswordForm
                    onSubmit={handleResetPassword}
                    onBack={() => setStep('forgot')}
                    isLoading={isLoading}
                    error={error}
                />
            )}

            {step === 'success' && (
                <SuccessScreen
                    title="Key Re-Synced"
                    message="Registry Node Updated Successfully"
                    buttonText="RETURN_TO_TERMINAL"
                    onContinue={handleBackToLogin}
                />
            )}

            <div className="fixed bottom-10 left-0 right-0 text-center opacity-30">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
                    Secure_Core_v2.5 // CivicHub_OS
                </p>
            </div>
        </div>
    );
}