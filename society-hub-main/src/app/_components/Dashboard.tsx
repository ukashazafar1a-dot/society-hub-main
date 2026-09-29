'use client'
import React, { useState } from 'react'

import {
    Users, ShieldCheck, Target, CreditCard, Bell, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { UserRole } from '@/src/utils/types';
import MetricCard from './MetricCard';
import IncidentAnalytics from './IncidentAnalytics';


const Dashboard = ({ role }: { role: UserRole }) => {
    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);;
    return (
        <>
            <div className="space-y-8 md:space-y-10">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900">Command Center</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Node: <span className="text-indigo-600">Civic_Node_Primary</span></p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <MetricCard
                        id={1}
                        title="RESIDENTS"
                        value="1,402"
                        icon={<Users />}
                        trend="+2.4%"
                        hoveredCardId={hoveredCardId}
                        setHoveredCardId={setHoveredCardId}
                    />
                    <MetricCard
                        id={2}
                        title="SAFETY"
                        value="STABLE"
                        icon={<ShieldCheck />}
                        trend="98%"
                        hoveredCardId={hoveredCardId}
                        setHoveredCardId={setHoveredCardId}
                    />
                    <MetricCard
                        id={3}
                        title="ASSETS"
                        value="128"
                        icon={<Target />}
                        trend="82%"
                        hoveredCardId={hoveredCardId}
                        setHoveredCardId={setHoveredCardId}
                    />
                    <MetricCard
                        id={4}
                        title="FINANCE"
                        value="$84,200"
                        icon={<CreditCard />}
                        trend="+4.1%"
                        hoveredCardId={hoveredCardId}
                        setHoveredCardId={setHoveredCardId}
                    />
                </div>
                <IncidentAnalytics
                    chartData={[
                        { date: 'Oct 01', registered: 12, resolved: 8 },
                        { date: 'Oct 08', registered: 18, resolved: 14 },
                        { date: 'Oct 15', registered: 15, resolved: 17 },
                        { date: 'Oct 22', registered: 22, resolved: 19 },
                        { date: 'Oct 29', registered: 10, resolved: 12 },
                        { date: 'Nov 05', registered: 25, resolved: 20 },
                        { date: 'Nov 12', registered: 14, resolved: 18 },
                    ]}
                    summaryData={[
                        { label: 'Volume', value: 119 },
                        { label: 'Resolved', value: 106, color: 'text-emerald-600' },
                        { label: 'Efficiency', value: '89.1%', color: 'text-indigo-600' },
                        { label: 'Response', value: '1.8d' },
                    ]}
                    newsData={[
                        {
                            type: 'Urgent',
                            icon: <Bell size={12} className="text-indigo-600" />,
                            labelColor: '#4f46e5',
                            message: 'General Meeting: Infrastructure Upgrade Vote on Oct 25th.',
                            time: '2 Hours Ago',
                        },
                        {
                            type: 'Maintenance',
                            icon: <AlertTriangle size={12} className="text-rose-500" />,
                            labelColor: '#f43f5e',
                            message: 'Elevator Node #4 Offline for balancing until 11 PM.',
                            time: '5 Hours Ago',
                        },
                    ]}
                />


            </div>

        </>
    )
}




export default Dashboard