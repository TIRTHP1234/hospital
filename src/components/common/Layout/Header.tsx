import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Bell, LogOut, Users } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface HeaderProps {
    toggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, supabase } = useAuth()

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    return (
        <header className="bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0 transition-all">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-4 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">Hospital Operations</h1>
            </div>

            <div className="flex items-center space-x-5">
                <Link
                    to="/registration"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 rounded-md shadow-sm text-sm font-semibold transition-all hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Users className="w-4 h-4" />
                    Registration Desk
                </Link>

                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                <HeadlessMenu as="div" className="relative">
                    <HeadlessMenu.Button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                        <Bell className="h-6 w-6 text-gray-700" />
                    </HeadlessMenu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <HeadlessMenu.Items className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-2xl bg-white/90 backdrop-blur-xl py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-white/50">
                            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-900">Notifications</span>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">2 New</span>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <HeadlessMenu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-white/60' : ''} w-full text-left px-4 py-3 border-b border-gray-50 flex gap-3 transition-colors`}>
                                            <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">High Bed Occupancy</p>
                                                <p className="text-xs text-gray-500 mt-0.5">ICU is currently at 92% capacity.</p>
                                                <p className="text-xs text-blue-500 mt-1">2 mins ago</p>
                                            </div>
                                        </button>
                                    )}
                                </HeadlessMenu.Item>
                                <HeadlessMenu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-white/60' : ''} w-full text-left px-4 py-3 flex gap-3 transition-colors`}>
                                            <div className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">ER Wait Time Alert</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Average wait time exceeds 45 mins.</p>
                                                <p className="text-xs text-blue-500 mt-1">15 mins ago</p>
                                            </div>
                                        </button>
                                    )}
                                </HeadlessMenu.Item>
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100">
                                <Link to="/" className="text-xs font-medium text-blue-600 hover:text-blue-700 block text-center">
                                    View on Dashboard
                                </Link>
                            </div>
                        </HeadlessMenu.Items>
                    </Transition>
                </HeadlessMenu>

                <HeadlessMenu as="div" className="relative ml-3">
                    <div>
                        <HeadlessMenu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-inner flex items-center justify-center text-white font-bold text-sm">
                                {user?.email?.charAt(0).toUpperCase() || 'A'}
                            </div>
                        </HeadlessMenu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <HeadlessMenu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm text-gray-900 truncate">{user?.email}</p>
                            </div>
                            <HeadlessMenu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`
                      ${active ? 'bg-gray-100' : ''}
                      flex w-full px-4 py-2 text-sm text-gray-700 items-center
                    `}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign out
                                    </button>
                                )}
                            </HeadlessMenu.Item>
                        </HeadlessMenu.Items>
                    </Transition>
                </HeadlessMenu>
            </div>
        </header>
    )
}
