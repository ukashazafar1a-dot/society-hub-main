import React from 'react';

type SummaryItem = {
    label: string;
    value: string | number;
    color?: string;
};

type SummaryCardsProps = {
    summaryData: SummaryItem[];
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ summaryData }) => {
    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-50 pt-8">
            {summaryData.map((item, idx) => (
                <div key={idx} className="text-center md:text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-2xl font-black tracking-tighter ${item.color ? item.color : 'text-slate-900'}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
