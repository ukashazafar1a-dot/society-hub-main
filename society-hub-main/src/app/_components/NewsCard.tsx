import React from 'react';

type NewsCardProps = {
    type: string;
    icon: React.ReactNode;
    labelColor: string;
    message: string;
    time: string;
};

const NewsCard: React.FC<NewsCardProps> = ({ type, icon, labelColor, message, time }) => {
    return (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: labelColor }}>
                    {type}
                </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">{message}</p>
            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">{time}</p>
        </div>
    );
};

export default NewsCard;
