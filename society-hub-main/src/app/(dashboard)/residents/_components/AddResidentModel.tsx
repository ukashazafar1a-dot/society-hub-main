'use client';

import React from 'react';
import { X, Shield, Info, FileText, User, Mail, Phone as PhoneIcon, Home, Briefcase, Car } from 'lucide-react';
import FormInput from './FormInput';
import FileUpload from './FileUpload';

interface AddResidentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddResidentModal: React.FC<AddResidentModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <div
                className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Registry Entry</h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">Node Identification Wizard</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 hover:border-rose-100 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
                    <form className="space-y-12">
                        {/* Basic Information Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><User size={16} /></div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Core Identity (Required)</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Full Name" placeholder="e.g. John Doe" icon={<User size={14} />} required />
                                <FormInput label="Email Address" placeholder="john@example.com" icon={<Mail size={14} />} required />
                                <FormInput label="Primary Phone" placeholder="+1 000-0000" icon={<PhoneIcon size={14} />} required />
                                <FormInput label="Apartment Unit" placeholder="e.g. A-402" icon={<Home size={14} />} required />
                            </div>
                        </section>

                        {/* Optional & Professional Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center"><Briefcase size={16} /></div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Extended Profile (Optional)</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Occupation" placeholder="Software Engineer" icon={<Briefcase size={14} />} />
                                <FormInput label="Vehicle Registration" placeholder="ABC-1234" icon={<Car size={14} />} />
                                <FormInput label="Emergency Contact" placeholder="+1 999-9999" icon={<PhoneIcon size={14} />} />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resident Type</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer">
                                        <option>Owner_Occupant</option>
                                        <option>Tenant</option>
                                        <option>Relative</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Document Submission */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><FileText size={16} /></div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verification Protocol (Required)</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FileUpload label="Government ID Proof" />
                                <FileUpload label="Registry / Rental Agreement" />
                            </div>
                        </section>

                        {/* Admin Remarks Section */}
                        <section className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <Shield size={16} className="text-indigo-600" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Administrative Control</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Remarks</label>
                                    <textarea
                                        placeholder="Note down any specific node instructions or background check results..."
                                        rows={3}
                                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none"
                                    ></textarea>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl">
                                    <Info size={14} className="text-indigo-500" />
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Node will be initiated in 'PENDING' status for verification</span>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:text-slate-900 transition-all shadow-sm"
                    >
                        ABORT_ENTRY
                    </button>
                    <button
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                        INITIALIZE_RESIDENT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddResidentModal;