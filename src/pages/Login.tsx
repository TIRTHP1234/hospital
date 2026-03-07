import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Activity, Lock, Mail } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Login: React.FC = () => {
    const { supabase } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    return <Navigate to="/dashboard" replace />

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md px-6 py-12 bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/20 z-10 m-4">
                <div className="flex justify-center mb-8 gap-3 items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            MediDash
                        </h2>
                        <p className="text-sm text-blue-200 font-medium">Next-Gen Hospital OS</p>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Work Email</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 bg-white/5 border border-white/10 text-white rounded-xl py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                                placeholder="doctor@hospital.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 bg-white/5 border border-white/10 text-white rounded-xl py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-200 text-sm bg-red-900/50 p-3 rounded-xl border border-red-500/30 backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {loading ? 'Authenticating...' : 'Sign In Securely'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-400 text-center flex flex-col items-center">
                    <p>Demo Hackathon Credentials</p>
                    <p className="font-mono bg-black/30 px-3 py-1.5 rounded-lg mt-2 text-white border border-white/5 shadow-inner">
                        <span className="text-blue-300">doctor_admin@hospital.com</span> <br />
                        <span className="text-indigo-300">adminpassword123</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}
