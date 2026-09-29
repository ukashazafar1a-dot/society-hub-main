'use client';
import { Menu, Bell, Search, User } from 'lucide-react';
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden">
                    <Menu />
                </button>

                <div className="relative hidden sm:block">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        placeholder="Search..."
                        className="bg-slate-100 rounded-xl py-2 pl-9 pr-4 text-xs"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Bell size={18} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    <User size={16} />
                </div>
            </div>
        </header>
    );
}
