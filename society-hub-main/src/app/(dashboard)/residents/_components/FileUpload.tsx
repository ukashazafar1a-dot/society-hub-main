import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
    label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label }) => (
    <div className="p-6 border-2 border-dashed border-slate-100 rounded-[2rem] hover:border-indigo-200 transition-all group bg-slate-50/30 flex flex-col items-center justify-center cursor-pointer text-center">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:shadow-lg transition-all mb-4">
            <Upload size={20} />
        </div>
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">PDF, JPG, or PNG (MAX 5MB)</p>
    </div>
);

export default FileUpload;