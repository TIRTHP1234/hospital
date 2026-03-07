import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Building2, ShieldPlus, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const hospitals = [
    {
        title: 'Central City Hospital',
        description: 'Advanced general hospital dashboard with real-time patient monitoring and staff management.',
        url: 'https://hospital-dashboard-u30f.onrender.com',
        icon: Building2,
        gradient: 'from-blue-500 to-cyan-500',
        delay: 0.1,
    },
    {
        title: 'Metro Speciality Center',
        description: 'Specialized healthcare tracking system focused on critical care and specialist appointments.',
        url: 'https://rround2.onrender.com',
        icon: ShieldPlus,
        gradient: 'from-purple-500 to-indigo-500',
        delay: 0.2,
    },
    {
        title: 'Global Health Institute',
        description: 'Comprehensive enterprise medical system integrating research, treatment, and resource allocation.',
        url: 'https://final-main-round-3.onrender.com',
        icon: HeartPulse,
        gradient: 'from-rose-500 to-orange-500',
        delay: 0.3,
    },
];

export const LeadPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-slate-950/50 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        MediDash Network
                    </span>
                </div>
                <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-semibold text-white transition-all bg-white/10 hover:bg-white/20 rounded-full border border-white/10"
                >
                    Staff Login
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center px-4 pt-20 pb-16 mx-auto max-w-7xl text-center lg:pt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                    </span>
                    Next-Generation Healthcare Management
                </motion.div>

                <div className="mb-8 relative z-10 w-full flex flex-col items-center">
                    {/* The glowing backdrop */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-blue-600/20 filter blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />

                    <motion.h1
                        className="text-6xl sm:text-7xl font-black tracking-tight lg:text-8xl drop-shadow-2xl text-white text-center"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                            },
                        }}
                    >
                        {['Select', 'Your', 'Hospital'].map((word, i) => (
                            <motion.span
                                key={word + i}
                                className="inline-block mr-3 md:mr-4 lg:mr-6"
                                variants={{
                                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 14, stiffness: 120 } },
                                }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-100 to-slate-400">
                                    {word}
                                </span>
                            </motion.span>
                        ))}
                        <br className="hidden md:block my-2" />
                        {['Dashboard', 'Instance'].map((word, i) => (
                            <motion.span
                                key={word + i}
                                className="inline-block mr-3 md:mr-4 lg:mr-6"
                                variants={{
                                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 14, stiffness: 120 } },
                                }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-100 via-white to-indigo-300">
                                    {word}
                                </span>
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="mb-16 max-w-2xl text-lg text-slate-300 lg:text-xl font-light leading-relaxed"
                >
                    Access our integrated network of specialized healthcare facilities.
                    Choose the appropriate hospital dashboard to continue to your customized portal.
                </motion.p>

                {/* Cards Grid */}
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {hospitals.map((hospital) => {
                        const IconComponent = hospital.icon;
                        return (
                            <motion.a
                                key={hospital.title}
                                href={hospital.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + hospital.delay }}
                                className="group relative flex flex-col p-6 overflow-hidden rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 text-left"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 filter blur-3xl transition-opacity group-hover:opacity-40 rounded-full" />

                                <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${hospital.gradient} shadow-lg`}>
                                    <IconComponent className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="mb-3 text-2xl font-bold text-slate-100">
                                    {hospital.title}
                                </h3>

                                <p className="mb-6 text-slate-400 flex-grow leading-relaxed">
                                    {hospital.description}
                                </p>

                                <div className="mt-auto flex items-center font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                                    Access Portal
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default LeadPage;
