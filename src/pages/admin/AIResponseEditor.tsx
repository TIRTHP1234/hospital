import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Save, Bot } from 'lucide-react';
import Sidebar from '../../components/patient/Sidebar';
import Button from '../../components/patient/Button';
import TextareaField from '../../components/patient/TextareaField';
import { updateQueryStatus } from '../../services/queryService';
import toast from 'react-hot-toast';

const AIResponseEditor = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const query = location.state?.query;

    const [aiSuggestion, setAiSuggestion] = useState(
        `Hello ${query?.name || 'Patient'},\n\nBased on your reported symptoms (${query?.symptoms || 'the symptoms provided'}), we highly recommend scheduling an appointment with our ${query?.department || 'specialists'}. Please avoid self-medicating and ensure you get plenty of rest.\n\nWarm regards,\nMediAI Assigned Doctor`
    );

    const [isSending, setIsSending] = useState(false);

    if (!query) {
        return (
            <div className="flex h-screen bg-slate-50 items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-600 mb-4">Query not found or session expired.</p>
                    <Button onClick={() => navigate('/staff/dashboard')}>Return to Dashboard</Button>
                </div>
            </div>
        );
    }

    const handleSendResponse = async () => {
        setIsSending(true);
        try {
            // In a real app we might update the response text to DB and send an email
            await updateQueryStatus(id, 'resolved');
            toast.success('Response sent successfully');
            navigate('/staff/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Failed to send response');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/staff/dashboard')}
                            className="p-2 -ml-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-800">AI Response Editor</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8 flex flex-col lg:flex-row gap-8">
                    {/* Left panel: Patient Query details */}
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-800">Patient Details</h2>
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${query.urgency_level === 'High' ? 'bg-red-50 text-red-700 border border-red-100' :
                                        query.urgency_level === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                            'bg-green-50 text-green-700 border border-green-100'
                                    }`}>
                                    {query.urgency_level} Priority
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name</p>
                                    <p className="text-slate-800 font-medium">{query.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                                    <p className="text-sm text-slate-800"><a href={`mailto:${query.email}`} className="text-hospital-blue hover:underline">{query.email}</a></p>
                                    <p className="text-sm text-slate-600">{query.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                                    <p className="text-slate-800">{query.department}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Submitted On</p>
                                    <p className="text-slate-800">{new Date(query.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1">
                            <h2 className="text-lg font-bold text-slate-800 mb-6">Query Content</h2>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Reported Symptoms</p>
                                <div className="bg-slate-50 p-4 rounded-xl text-slate-700 border border-slate-100 whitespace-pre-wrap">
                                    {query.symptoms}
                                </div>
                            </div>

                            {query.message && (
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Additional Message</p>
                                    <div className="bg-slate-50 p-4 rounded-xl text-slate-700 border border-slate-100 whitespace-pre-wrap">
                                        {query.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right panel: AI Editor */}
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex-1 flex flex-col p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Bot className="h-6 w-6 text-indigo-500" />
                                    AI Suggested Response
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
                                        <Save className="h-4 w-4" />
                                        Save Draft
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <TextareaField
                                    id="aiResponse"
                                    className="flex-1 min-h-[300px] text-base leading-relaxed p-6"
                                    value={aiSuggestion}
                                    onChange={(e) => setAiSuggestion(e.target.value)}
                                />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                                <p className="text-sm text-slate-500">
                                    You can edit the AI suggestion above before sending.
                                </p>
                                <Button
                                    size="lg"
                                    className="gap-2 px-8"
                                    onClick={handleSendResponse}
                                    isLoading={isSending}
                                >
                                    <Send className="h-4 w-4" />
                                    Approve & Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AIResponseEditor;
