'use client';

import React, { useState } from 'react';
import { Search, Plus, Megaphone } from 'lucide-react';
import FilterBar from './FilterBar';
import AnnouncementCard from './AnnouncementCard';
import CreateAnnouncementModal from './CreateAnnouncementModal';
import { Announcement, CreateAnnouncementData, FilterType } from '@/src/utils/types';
import AnnouncementDetail from './AnnouncementDetail';

const initialFeed: Announcement[] = [
    {
        id: 'ann-1',
        type: 'ALERT',
        priority: 'HIGH',
        title: 'Power Grid Stabilization',
        content: 'Temporary node offline for Block A during capacity balancing. We expect full restoration by 11:30 PM. Please disconnect sensitive hardware to prevent surge damage during reconnection cycles.',
        date: 'Oct 15, 09:00',
        author: 'Chief Tech Officer',
        readCount: 412
    },
    {
        id: 'ann-2',
        type: 'INFO',
        priority: 'LOW',
        title: 'Community Garden Upgrade',
        content: 'New automated irrigation system installation starting tomorrow. This upgrade will reduce water consumption by 40% while ensuring optimal soil moisture for our winter harvest.',
        date: 'Oct 14, 15:30',
        author: 'Green Committee',
        readCount: 156
    },
    {
        id: 'ann-3',
        type: 'EVENT',
        priority: 'MEDIUM',
        title: 'Annual Festivity Planning',
        content: 'Join the steering committee for the upcoming Winter Gala. We are looking for volunteers for decoration, catering coordination, and logistics. First meeting this Friday at the Clubhouse.',
        date: 'Oct 14, 11:00',
        author: 'Social Lead',
        readCount: 289
    },
    {
        id: 'ann-4',
        type: 'MAINTENANCE',
        priority: 'HIGH',
        title: 'Emergency Drill Protocol',
        content: 'Full simulation scheduled for next Sunday at 10 AM sharp. Please review the evacuation paths in your hallway and ensure all family members are briefed on the assembly points.',
        date: 'Oct 13, 18:00',
        author: 'Safety Ops',
        readCount: 540
    },
];

const AnnouncementsModule: React.FC = () => {
    const [feed, setFeed] = useState<Announcement[]>(initialFeed);
    const [selectedAnn, setSelectedAnn] = useState<Announcement | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterType>('ALL');

    const filteredFeed = feed.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'ALL' || item.type === filter;
        return matchesSearch && matchesFilter;
    });

    const handleCreateAnnouncement = (data: CreateAnnouncementData) => {
        const newAnnouncement: Announcement = {
            id: `ann-${Date.now()}`,
            ...data,
            date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            author: 'Admin User',
            readCount: 0
        };

        setFeed(prev => [newAnnouncement, ...prev]);
        setIsCreateModalOpen(false);
    };

    const handleDeleteAnnouncement = (id: string) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            setFeed(prev => prev.filter(item => item.id !== id));
            if (selectedAnn?.id === id) {
                setSelectedAnn(null);
            }
        }
    };

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Broadcasting Hub</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                        Live Feed Status: <span className="text-emerald-500">SYNCHRONIZED</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find broadcast..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3 uppercase"
                    >
                        <Plus size={16} /> NEW_BROADCAST
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            {/* Content */}
            {selectedAnn ? (
                <AnnouncementDetail
                    announcement={selectedAnn}
                    onBack={() => setSelectedAnn(null)}
                    onDelete={() => handleDeleteAnnouncement(selectedAnn.id)}
                />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredFeed.map((item) => (
                        <AnnouncementCard
                            key={item.id}
                            announcement={item}
                            onClick={() => setSelectedAnn(item)}
                        />
                    ))}

                    {filteredFeed.length === 0 && (
                        <div className="quartz-card p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg text-center">
                            <Megaphone size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-2">
                                No Announcements Found
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {`Try adjusting your search or filter to find what you're looking for.`}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Create Announcement Modal */}
            <CreateAnnouncementModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
              
            />
        </div>
    );
};

export default AnnouncementsModule;