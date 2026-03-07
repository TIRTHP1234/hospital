import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, MessageSquare, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-hospital-light">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-24 pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50" />
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-3xl opacity-50 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl opacity-50 pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-hospital-blue font-medium text-sm mb-8 animate-fade-in-up">
                            <Activity className="h-4 w-4" />
                            <span>AI-Assisted Patient Support</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Exceptional Care,<br className="hidden md:block" /> Start to Finish
                        </h1>

                        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            Experience seamless healthcare access with our intelligent query system and straightforward appointment booking. We're here to support your journey to wellness.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <Link to="/query">
                                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                                    <MessageSquare className="h-5 w-5" />
                                    Submit a Query
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/status">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                                    <Activity className="h-5 w-5 text-hospital-blue" />
                                    Check Status
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose MediAI Support?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Our modern platform ensures you get the care you need, when you need it, with minimal friction.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Clock, title: "Rapid Responses", desc: "Our AI-assisted staff ensures your questions are answered quickly and accurately." },
                                { icon: ShieldCheck, title: "Secure & Confidential", desc: "Your health information is protected with enterprise-grade security." },
                                { icon: Activity, title: "Real-Time Tracking", desc: "Track your query status instantly with your unique Case ID." }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-hospital-light p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-hospital-blue">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
