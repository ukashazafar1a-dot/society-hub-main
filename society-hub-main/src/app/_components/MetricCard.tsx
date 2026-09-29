import React from 'react';

type MetricCardProps = {
    id: number;
    title: string;
    value: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; // Optionally: LucideIcon
    trend: string;
    hoveredCardId: number | null;
    setHoveredCardId: React.Dispatch<React.SetStateAction<number | null>>;
};

const MetricCard: React.FC<MetricCardProps> = ({
    id,
    title,
    value,
    icon,
    trend,
    hoveredCardId,
    setHoveredCardId,
}) => {
    const isHovered = hoveredCardId === id; // Determine hover per card

    return (
        <div
            onMouseEnter={() => setHoveredCardId(id)}
            onMouseLeave={() => setHoveredCardId(null)}
            className="quartz-card p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 spatial-3d group cursor-default"
        >
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <div
                    className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-500 ${isHovered
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}
                >
                    {React.cloneElement(icon)}
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {trend}
                </div>
            </div>
            <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {title}
            </h4>
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{value}</p>

            <div className="mt-6 w-full h-[3px] bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" />
            </div>
        </div>
    );
};

export default MetricCard;
