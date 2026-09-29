'use client';

import React from 'react';
import { MessageCircle, Phone, MoreVertical, Shield } from 'lucide-react';
import { Resident } from '@/src/utils/types';


interface ResidentTableProps {
    residents: Resident[];
}

const ResidentTable: React.FC<ResidentTableProps> = ({ residents }) => {
    return (
        <div className="quartz-card rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resident</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit_ID</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {residents.map((res) => (
                            <tr
                                key={res.id}
                                className="group hover:bg-indigo-50/40 transition-colors cursor-pointer"
                            >
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:border-indigo-100 transition-all">
                                            {res.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{res.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Verified_Member</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <Shield size={12} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{res.apartment}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${res.status === 'Active'
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        : res.status === 'Pending'
                                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                            : 'bg-rose-50 text-rose-500 border border-rose-100'
                                        }`}>
                                        {res.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-white hover:text-indigo-600 hover:border-indigo-100 border border-transparent transition-all">
                                            <MessageCircle size={14} />
                                        </button>
                                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-white hover:text-emerald-600 hover:border-emerald-100 border border-transparent transition-all">
                                            <Phone size={14} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentTable;