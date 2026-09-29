'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Terminal } from 'lucide-react';
import { Complaint, CreateComplaintData, HistoryItem, User } from '@/src/utils/types';
import ComplaintDetail from './ComplaintDetail';
import CreateComplaintModal from './CreateComplaintModal';
import ComplaintList from './ComplaintList';

const mockHistory: HistoryItem[] = [
    { id: 'h1', action: 'Incident Reported', date: '2023-11-20 09:00', actor: 'Resident' },
    { id: 'h2', action: 'Priority Assigned: High', date: '2023-11-20 09:15', actor: 'System' },
    { id: 'h3', action: 'Assigned to Electrical Team', date: '2023-11-20 10:30', actor: 'Admin' },
    { id: 'h4', action: 'Technician Dispatched', date: '2023-11-20 14:00', actor: 'Staff' },
];

const initialComplaints: Complaint[] = [
    {
        id: 'C1',
        title: 'Electrical surge in Block B',
        category: 'Maintenance',
        status: 'In-Progress',
        residentId: 'R1',
        priority: 'HIGH',
        date: '2023-11-20',
        description: 'Resident reports a persistent electrical instability in Block B, specifically affecting unit circuits and common corridor lighting.',
        assignedTo: 'Maintenance_Node_A',
        location: 'Block B, Floor 3'
    },
    {
        id: 'C2',
        title: 'Main lobby door lock broken',
        category: 'Infrastructure',
        status: 'Open',
        residentId: 'R2',
        priority: 'MEDIUM',
        date: '2023-11-21',
        description: 'Main entrance door lock malfunctioning, causing security concerns.',
        assignedTo: 'Security_Team',
        location: 'Main Lobby'
    },
    {
        id: 'C3',
        title: 'Suspicious activity near gate',
        category: 'Security',
        status: 'Resolved',
        residentId: 'R3',
        priority: 'HIGH',
        date: '2023-11-18',
        description: 'Unidentified individuals loitering near main gate after hours.',
        assignedTo: 'Security_Patrol',
        location: 'Main Gate Area'
    },
    {
        id: 'C4',
        title: 'Pet waste in common area',
        category: 'Hygiene',
        status: 'Open',
        residentId: 'R1',
        priority: 'LOW',
        date: '2023-11-22',
        description: 'Multiple instances of pet waste found in children\'s play area.',
        assignedTo: 'Sanitation_Team',
        location: 'Play Area, Block C'
    },
];

interface ComplaintsModuleProps {
    user: User;
}

const ComplaintsModule: React.FC<ComplaintsModuleProps> = ({ user }) => {
    const [view, setView] = useState<'list' | 'details'>('list');
    const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const openDetails = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setView('details');
    };

    const handleCreateComplaint = (data: CreateComplaintData) => {
        const newComplaint: Complaint = {
            id: `C${complaints.length + 1}`,
            ...data,
            status: 'Open' as const,
            residentId: user.id,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        };

        setComplaints(prev => [newComplaint, ...prev]);
        setIsRaiseModalOpen(false);
    };

    const handleUpdateStatus = (id: string, status: Complaint['status']) => {
        setComplaints(prev => prev.map(c =>
            c.id === id ? { ...c, status } : c
        ));

        if (selectedComplaint?.id === id) {
            setSelectedComplaint(prev => prev ? { ...prev, status } : null);
        }
    };

    const filteredComplaints = complaints.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {view === 'list' ? 'Incident Terminal' : 'Ticket Intelligence'}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                        Monitoring_Node: <span className="text-indigo-600">Active_Telemetry</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {view === 'details' && (
                        <button
                            onClick={() => setView('list')}
                            className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">BACK_TO_LOGS</span>
                        </button>
                    )}

                    <button
                        onClick={() => setIsRaiseModalOpen(true)}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                    >
                        <Plus size={16} /> RAISE_TICKET
                    </button>
                </div>
            </div>

            {/* Content */}
            {view === 'list' ? (
                <ComplaintList
                    complaints={filteredComplaints}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onComplaintClick={openDetails}
                />
            ) : (
                selectedComplaint && (
                    <ComplaintDetail
                        complaint={selectedComplaint}
                        history={mockHistory}
                        onBack={() => setView('list')}
                        onUpdateStatus={(status) => handleUpdateStatus(selectedComplaint.id, status)}
                    />
                )
            )}

            {/* Create Complaint Modal */}
            <CreateComplaintModal
                isOpen={isRaiseModalOpen}
                onClose={() => setIsRaiseModalOpen(false)}
                onSubmit={handleCreateComplaint}
            />
        </div>
    );
};

export default ComplaintsModule;