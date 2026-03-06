import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, Activity } from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const location = useLocation()

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Settings', path: '/settings', icon: Settings },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white/70 backdrop-blur-xl border-r border-white/40 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
                <div className="flex items-center justify-center h-16 border-b border-white/40 px-4">
                    <Activity className="w-8 h-8 text-blue-600 mr-2" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">MediDash</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                  ${isActive(item.path)
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 translate-x-1'
                                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 hover:translate-x-1'}
                `}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
