import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Calendar, Settings, LogOut, Activity } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
        { name: 'Queries (AI Chat)', path: '/staff/queries', icon: MessageSquare },
        { name: 'Appointments', path: '/staff/appointments', icon: Calendar },
        { name: 'Settings', path: '/staff/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-slate-900 min-h-screen text-slate-300 flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                    <Activity className="h-6 w-6 text-hospital-blue group-hover:text-blue-400 transition-colors" />
                    <span className="font-bold text-lg text-white tracking-tight">MediAI Staff</span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 flex flex-col gap-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Menu</p>
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? 'bg-hospital-blue text-white shadow-md shadow-blue-500/20'
                                : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800 shrink-0">
                <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
