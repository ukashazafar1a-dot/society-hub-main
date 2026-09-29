'use client';

import { useRouter } from 'next/navigation';
import AuthFlow from './AuthFlow';

export default function AuthPage() {
    const router = useRouter();

    const handleLoginSuccess = () => {
        router.push('/');
    };

    return (
        <AuthFlow onLoginSuccess={handleLoginSuccess} />
    );
}