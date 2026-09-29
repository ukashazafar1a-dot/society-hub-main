import { PasswordCriteria, PasswordStrength } from "@/src/utils/types";

/**
 * Mock user database for demo purposes
 */
export const mockUsers = [
    {
        id: 'usr-1',
        name: 'John Doe',
        email: 'john.doe@civichub.ai',
        password: 'Password123!',
        role: 'resident',
        apartment: 'A-102',
        phone: '+1 (555) 123-4567'
    },
    {
        id: 'usr-2',
        name: 'Jane Smith',
        email: 'jane.smith@civichub.ai',
        password: 'Admin@2024',
        role: 'admin',
        apartment: 'B-205',
        phone: '+1 (555) 234-5678'
    },
    {
        id: 'usr-3',
        name: 'Mike Johnson',
        email: 'mike.johnson@civichub.ai',
        password: 'Staff@123',
        role: 'staff',
        apartment: 'C-304',
        phone: '+1 (555) 345-6789'
    }
];

/**
 * Password validation rules
 */
export const passwordValidationRules = {
    minLength: 8,
    maxLength: 32,
    requireUpperCase: true,
    requireLowerCase: true,
    requireNumbers: true,
    requireSpecialChar: true
};

/**
 * Password strength indicators
 */
export const passwordStrengthConfig: Record<PasswordStrength, { color: string; label: string; score: number }> = {
    'weak': { color: 'rose', label: 'WEAK', score: 1 },
    'medium': { color: 'amber', label: 'MEDIUM', score: 2 },
    'strong': { color: 'indigo', label: 'STRONG', score: 3 },
    'very-strong': { color: 'emerald', label: 'VERY STRONG', score: 4 }
};

/**
 * Email validation regex
 */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation function
 */
export const validatePassword = (password: string): PasswordCriteria => {
    return {
        minLength: password.length >= passwordValidationRules.minLength,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
};

/**
 * Calculate password strength
 */
export const calculatePasswordStrength = (password: string): PasswordStrength => {
    const criteria = validatePassword(password);
    const score = Object.values(criteria).filter(Boolean).length;

    if (score <= 2) return 'weak';
    if (score === 3) return 'medium';
    if (score === 4) return 'strong';
    return 'very-strong';
};

/**
 * Auth messages
 */
export const authMessages = {
    login: {
        success: 'Authentication successful. Redirecting to dashboard...',
        invalid: 'Invalid email or access key. Please try again.',
        locked: 'Account temporarily locked. Please try again in 15 minutes.',
        notFound: 'No account found with this email address.'
    },
    reset: {
        codeSent: 'Recovery code has been sent to your email.',
        invalidCode: 'Invalid recovery code. Please try again.',
        expiredCode: 'Recovery code has expired. Please request a new one.',
        success: 'Your access key has been successfully reset.'
    },
    register: {
        success: 'Registration successful. Welcome to CivicHub!',
        emailExists: 'This email is already registered.',
        passwordMismatch: 'Access keys do not match.'
    }
};