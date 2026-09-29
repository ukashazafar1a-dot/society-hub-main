import React from 'react';
import { Megaphone, ArrowUpRight } from 'lucide-react';
import ChartData from './ChartData';
import SummaryCards from './SummaryCard';
import NewsCards from './NewsCards';


type IncidentAnalyticsProps = {
    chartData: { date: string; registered: number; resolved: number }[];
    summaryData: { label: string; value: string | number; color?: string }[];
    newsData: { type: string; icon: React.ReactNode; labelColor: string; message: string; time: string }[];
};

const IncidentAnalytics: React.FC<IncidentAnalyticsProps> = ({ chartData, summaryData, newsData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-8 quartz-card p-6 md:p-10 rounded-[2rem] bg-white shadow-xl shadow-slate-200/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Incident Analytics</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Complaints Resolution Efficiency
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Registered
                        </span>
                        <span className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Resolved
                        </span>
                    </div>
                </div>

                <ChartData chartData={chartData} />
                <SummaryCards summaryData={summaryData} />
            </div>

            {/* News Section */}
            <div className="lg:col-span-4 quartz-card p-6 md:p-10 rounded-[2rem] bg-white border-indigo-50 shadow-xl shadow-slate-200/30">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                            <Megaphone size={18} />
                        </div>
                        <h3 className="font-black text-sm text-slate-900">Society News</h3>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300" />
                </div>

                <NewsCards newsData={newsData} />

                <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 transition-all mt-8 shadow-sm">
                    Access Communications
                </button>
            </div>
        </div>
    );
};

export default IncidentAnalytics;
