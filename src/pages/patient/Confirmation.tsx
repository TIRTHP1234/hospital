
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import Navbar from '../../components/patient/Navbar';
import Footer from '../../components/patient/Footer';
import Button from '../../components/patient/Button';

const Confirmation = () => {
    const location = useLocation();
    const isQuery = location.state?.type === 'query';

    return (
        <div className="min-h-screen flex flex-col bg-hospital-light">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 max-w-lg w-full text-center hover:shadow-md transition-shadow">
                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Request Successfully Submitted</h1>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Your health query has been successfully submitted. Our hospital staff will review it and contact you shortly.
                        You will also receive a confirmation email with your Case ID.
                    </p>

                    {isQuery && location.state?.queryId && (
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                            <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Your Unique Case ID</h3>
                            <div className="text-xl font-mono text-slate-800 font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 inline-block shadow-sm">
                                {location.state.queryId}
                            </div>
                            <p className="text-xs text-slate-500 mt-3">Please save this ID to track your query status.</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/dashboard">
                            <Button variant="secondary" className="w-full sm:w-auto">
                                Return Home
                            </Button>
                        </Link>
                        <Link to="/status">
                            <Button className="w-full sm:w-auto gap-2 group">
                                <Activity className="h-4 w-4" />
                                Track Your Status
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Confirmation;
