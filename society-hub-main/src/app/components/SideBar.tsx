'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, Globe, CalendarCheck, Megaphone,
    MessageSquareWarning, PieChart, FileText, Wrench, Receipt, Settings, Shield
} from 'lucide-react';
import { UserRole } from '@/src/utils/types';


const menu = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'RESIDENT', 'STAFF', 'PROVIDER'] },
    { href: '/residents', label: 'Residents', icon: Users, roles: ['ADMIN', 'STAFF'] },
    { href: '/communities', label: 'Communities', icon: Globe, roles: ['ADMIN', 'STAFF'] },
    { href: '/bookings', label: 'Bookings', icon: CalendarCheck, roles: ['ADMIN', 'RESIDENT', 'STAFF'] },
    { href: '/announcements', label: 'Announcements', icon: Megaphone, roles: ['ADMIN', 'RESIDENT', 'STAFF'] },
    { href: '/complaints', label: 'Complaints', icon: MessageSquareWarning, roles: ['ADMIN', 'RESIDENT', 'STAFF', 'PROVIDER'] },
    { href: '/marketing', label: 'Marketing', icon: PieChart, roles: ['ADMIN', 'STAFF'] },
    { href: '/forms', label: 'Forms', icon: FileText, roles: ['ADMIN', 'STAFF'] },
    { href: '/services', label: 'Services', icon: Wrench, roles: ['ADMIN', 'RESIDENT', 'PROVIDER'] },
    { href: '/billing', label: 'Billing', icon: Receipt, roles: ['ADMIN', 'RESIDENT'] },
    { href: '/settings', label: 'Settings', icon: Settings, roles: ['ADMIN', 'RESIDENT', 'STAFF', 'PROVIDER'] },
];

export default function Sidebar({ role }: { role: UserRole }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    console.log(pathname)

    return (
        <aside className={`h-screen bg-white border-r transition-all ${collapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col`}>

            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center cursor-pointer"
                >
                    <Shield className="text-white" size={20} />
                </button>
                {!collapsed && (
                    <span className="font-black text-lg uppercase italic">SMS</span>
                )}
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 space-y-1">
                {menu
                    .filter(item => item.roles.includes(role))
                    .map(item => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 p-3 rounded-xl text-sm font-bold transition
                                       ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}
                `}
                            >
                                <Icon size={20} />
                                {!collapsed && <span className="uppercase text-[11px]">{item.label}</span>}
                            </Link>
                        );
                    })}
            </nav>
        </aside>
    );
}
