'use client';

import React, { useState } from 'react';
import {
    Search, Plus,
    ChevronLeft, ChevronRight,
    Filter,
} from 'lucide-react';
import { Resident } from '@/src/utils/types';
import ResidentTable from './_components/ResidentTable';
import AddResidentModal from './_components/AddResidentModel';

const ResidentModule: React.FC = () => {
    const [residents, setResidents] = useState<Resident[]>([
        { id: '1', name: 'Julian Draxler', apartment: 'A-101', phone: '+1 555-0101', status: 'Active' },
        { id: '2', name: 'Sophia Loren', apartment: 'B-205', phone: '+1 555-0102', status: 'Active' },
        { id: '3', name: 'Marcus Rashford', apartment: 'C-404', phone: '+1 555-0103', status: 'Pending' },
        { id: '4', name: 'Emily Blunt', apartment: 'A-302', phone: '+1 555-0104', status: 'Active' },
        { id: '5', name: 'Christian Bale', apartment: 'D-901', phone: '+1 555-0105', status: 'Inactive' },
        { id: '6', name: 'Robert Downey', apartment: 'A-102', phone: '+1 555-0106', status: 'Active' },
        { id: '7', name: 'Scarlett Johans', apartment: 'B-206', phone: '+1 555-0107', status: 'Active' },
        { id: '8', name: 'Chris Evans', apartment: 'C-405', phone: '+1 555-0108', status: 'Pending' },
        { id: '9', name: 'Mark Ruffalo', apartment: 'A-303', phone: '+1 555-0109', status: 'Active' },
        { id: '10', name: 'Tom Holland', apartment: 'D-902', phone: '+1 555-0110', status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const itemsPerPage = 6;

    const filtered = residents.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.apartment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Member Directory</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Registry node: primary_cluster_01</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Identify Node (Name or Unit)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold w-full outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={18} />
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 shrink-0 hover:bg-indigo-700 transition-all flex items-center gap-2 px-6"
                    >
                        <Plus size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Add_Node</span>
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <ResidentTable residents={currentItems} />

            {/* Pagination Footer */}
            <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Showing <span className="text-slate-900">{indexOfFirstItem + 1}</span> to <span className="text-slate-900">{Math.min(indexOfLastItem, filtered.length)}</span> of <span className="text-slate-900">{filtered.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                    <button onClick={goToPrevPage} disabled={currentPage === 1} className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:pointer-events-none transition-all">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 disabled:pointer-events-none transition-all">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Add Resident Modal */}
            {isAddModalOpen && (
                <AddResidentModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ResidentModule;