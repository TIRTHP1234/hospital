import React from 'react'
import { Menu, Bell, LogOut } from 'lucide-react'
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
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-4 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">Hospital Operations</h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                    <Bell className="h-6 w-6" />
                </button>

                <HeadlessMenu as="div" className="relative ml-3">
                    <div>
                        <HeadlessMenu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
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
