import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-hospital-light sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard" className="flex items-center gap-2 group">
                            <div className="bg-hospital-blue p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight">MediAI Support</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/query"
                            className={`text-sm font-medium transition-colors hover:text-hospital-blue ${location.pathname === '/query' ? 'text-hospital-blue' : 'text-slate-600'}`}
                        >
                            Submit Query
                        </Link>
                        <Link
                            to="/status"
                            className={`text-sm font-medium transition-colors hover:text-hospital-blue ${location.pathname === '/status' ? 'text-hospital-blue' : 'text-slate-600'}`}
                        >
                            Track Status
                        </Link>
                        <Link
                            to="/staff"
                            className={`text-sm font-medium transition-colors hover:text-hospital-blue ${location.pathname.startsWith('/staff') ? 'text-hospital-blue' : 'text-slate-600'}`}
                        >
                            Staff Portal
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
