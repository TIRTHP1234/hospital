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
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
                <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
                    <Activity className="w-8 h-8 text-blue-600 mr-2" />
                    <span className="text-xl font-bold text-gray-900 tracking-tight">MediDash</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${isActive(item.path) ? 'text-blue-700' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
