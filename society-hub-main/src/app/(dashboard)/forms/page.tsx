'use client';

import { Form, FormSubmission, User, UserRole } from '@/src/utils/types';
import { useState, useEffect } from 'react';
import FormsModule from './_components/FormsModule';

export default function FormsPage() {
    const [user] = useState<User>({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
        apartment: 'A-101'
    });

    const formData: Form[] = [
        {
            id: 'f1',
            title: 'Resident Feedback Survey 2023',
            description: 'General survey about facilities and service satisfaction.',
            status: 'Active',
            totalSubmissions: 124,
            newSubmissions: 12,
            createdDate: 'Oct 10, 2023',
            fields: [
                { id: 'fd1', label: 'Resident Name', type: 'text', required: true, visible: true },
                { id: 'fd2', label: 'Overall Rating', type: 'select', options: ['1', '2', '3', '4', '5'], required: true, visible: true },
                { id: 'fd3', label: 'Comments', type: 'textarea', required: false, visible: true },
            ]
        },
        {
            id: 'f2',
            title: 'Gate Pass Request Form',
            description: 'Standard form for guest vehicle gate passes.',
            status: 'Active',
            totalSubmissions: 450,
            newSubmissions: 35,
            createdDate: 'Sep 05, 2023',
            fields: [
                { id: 'fd4', label: 'Vehicle Number', type: 'text', required: true, visible: true },
                { id: 'fd5', label: 'Visit Duration', type: 'select', options: ['1 Hour', '4 Hours', 'Full Day'], required: true, visible: true },
            ]
        },
    ];

    const submissionData: FormSubmission[] = [
        { id: 's1', formId: 'f1', data: { 'Resident Name': 'John Doe', 'Overall Rating': '5', 'Comments': 'Great work on the gardens!' }, submittedBy: 'Unit A-102', submittedAt: 'Nov 14, 2023, 10:20 AM', isNew: true },
        { id: 's2', formId: 'f1', data: { 'Resident Name': 'Jane Smith', 'Overall Rating': '4', 'Comments': 'Pool needs cleaning more often.' }, submittedBy: 'Unit B-205', submittedAt: 'Nov 13, 2023, 03:45 PM', isNew: false },
    ];

    const [forms, setForms] = useState(formData);
    const [submissions, setSubmissions] = useState(submissionData);
    const [isLoading, setIsLoading] = useState(true);
    console.log(forms);
    console.log(submissions);

    useEffect(() => {
        // Simulate loading data
        const loadData = async () => {
            setIsLoading(true);
            try {
                // In a real app, you'd fetch from API here
                setForms(formData);
                setSubmissions(submissionData);
            } catch (error) {
                console.error('Error loading forms:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleUpdateForms = (updatedForms: typeof forms) => {
        setForms(updatedForms);
        // Optional: Save to localStorage
        localStorage.setItem('forms', JSON.stringify(updatedForms));
    };

    const handleUpdateSubmissions = (updatedSubmissions: typeof submissions) => {
        setSubmissions(updatedSubmissions);
        localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    };

    if (isLoading) {
        return (
            <div className="">
                <div className="">
                    <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                            Loading Form Registry...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                <FormsModule
                    user={user}
                    forms={forms}
                    submissions={submissions}
                    onUpdateForms={handleUpdateForms}
                    onUpdateSubmissions={handleUpdateSubmissions}
                />
            </div>
        </div>
    );
}