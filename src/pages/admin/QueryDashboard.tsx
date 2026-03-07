import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Clock, CheckCircle, ListTodo, Search, Filter } from 'lucide-react';
import Sidebar from '../../components/patient/Sidebar';
import StatCard from '../../components/patient/StatCard';
import { getPatientQueries } from '../../services/queryService';
import Button from '../../components/patient/Button';
import toast from 'react-hot-toast';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [queries, setQueries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const data = await getPatientQueries();
            setQueries(data || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load queries.');
        } finally {
            setIsLoading(false);
        }
    };

    const pending = queries.filter(q => q.status === 'pending').length;
    const resolved = queries.filter(q => q.status === 'resolved').length;

    const filteredQueries = queries.filter(q =>
        q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <h1 className="text-xl font-bold text-slate-800">Staff Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-hospital-blue font-bold">
                                DR
                            </div>
                            <span className="text-sm font-medium text-slate-700">Dr. User</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Queries"
                            value={queries.length}
                            icon={ListTodo}
                            trend="up"
                            trendValue="12"
                        />
                        <StatCard
                            title="Pending Responses"
                            value={pending}
                            icon={Clock}
                            className="border-amber-100"
                        />
                        <StatCard
                            title="Resolved Queries"
                            value={resolved}
                            icon={CheckCircle}
                            className="border-emerald-100"
                        />
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-lg font-bold text-slate-800">Recent Queries</h2>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search patients..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-hospital-blue focus:border-hospital-blue transition-shadow"
                                    />
                                </div>
                                <Button variant="secondary" className="px-3 gap-2 shrink-0">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="p-8 text-center text-slate-500">Loading queries...</div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                                            <th className="px-6 py-4 font-medium">Patient</th>
                                            <th className="px-6 py-4 font-medium">Department</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium">Urgency</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredQueries.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No queries found.</td>
                                            </tr>
                                        ) : (
                                            filteredQueries.map((query) => (
                                                <tr key={query.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-slate-800">{query.name}</div>
                                                        <div className="text-xs text-slate-500">{query.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">{query.department}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {new Date(query.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${query.urgency_level === 'High' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                                query.urgency_level === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                                    'bg-green-50 text-green-700 border border-green-100'
                                                            }`}>
                                                            {query.urgency_level}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${query.status === 'pending' ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-blue-700'
                                                            }`}>
                                                            {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Button
                                                            size="sm"
                                                            variant={query.status === 'pending' ? 'primary' : 'secondary'}
                                                            onClick={() => navigate(`/staff/editor/${query.id}`, { state: { query } })}
                                                        >
                                                            {query.status === 'pending' ? 'Review' : 'View'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffDashboard;
