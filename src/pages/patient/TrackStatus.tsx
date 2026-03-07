import React, { useState } from 'react';
import Navbar from '../../components/patient/Navbar';
import Footer from '../../components/patient/Footer';
import InputField from '../../components/patient/InputField';
import Button from '../../components/patient/Button';
import { Search, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { getQueryById } from '../../services/queryService';
import toast from 'react-hot-toast';

const TrackStatus = () => {
    const [queryId, setQueryId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [queryResult, setQueryResult] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!queryId.trim()) {
            toast.error('Please enter a valid Case ID.');
            return;
        }

        setIsLoading(true);
        setQueryResult(null);

        try {
            const data = await getQueryById(queryId.trim());
            setQueryResult(data);
        } catch (error) {
            console.error(error);
            toast.error('No case found with that ID or there was an error retrieving it.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-hospital-light">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-hospital-blue rounded-2xl mb-4">
                        <Activity className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Track Query Status</h1>
                    <p className="text-slate-600 mt-2 max-w-lg mx-auto">
                        Enter the unique Case ID you received in your confirmation email to check the real-time status of your medical query.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-2">
                        <div className="flex-1">
                            <InputField
                                id="queryId"
                                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                                value={queryId}
                                onChange={(e) => setQueryId(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="shrink-0 h-[46px] px-8 gap-2" isLoading={isLoading}>
                            <Search className="h-4 w-4" />
                            Track Case
                        </Button>
                    </form>
                </div>

                {queryResult && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 animate-fade-in-up">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Query Details</h2>
                                <p className="text-sm text-slate-500 mt-1">Submitted on {new Date(queryResult.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold border ${queryResult.status === 'pending'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-green-50 text-green-700 border-green-200'
                                }`}>
                                {queryResult.status === 'pending' ? <Clock className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                {queryResult.status.charAt(0).toUpperCase() + queryResult.status.slice(1)}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 mb-1">Patient Name</h3>
                                <p className="text-slate-800 font-medium">{queryResult.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 mb-1">Department Assigned</h3>
                                <p className="text-slate-800 font-medium">{queryResult.department}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
                            <h3 className="text-sm font-semibold text-slate-500 mb-2">Symptoms Reported</h3>
                            <p className="text-slate-800 text-sm leading-relaxed">{queryResult.symptoms}</p>
                        </div>

                        {queryResult.status === 'resolved' && (
                            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                                <h3 className="text-sm font-semibold text-hospital-blue mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Staff / AI Response Processed
                                </h3>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    Your query has been marked as resolved by our medical staff. Please check your email inbox for detailed instructions or an invitation to book an appointment if necessary.
                                </p>
                            </div>
                        )}

                        {queryResult.status === 'pending' && (
                            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
                                <p className="text-amber-800 text-sm">
                                    Our medical team is currently reviewing your case. We appreciate your patience.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default TrackStatus;
