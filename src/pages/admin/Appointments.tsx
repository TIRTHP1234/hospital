import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Search, Filter } from 'lucide-react';
import Sidebar from '../../components/patient/Sidebar';
import { getAppointments } from '../../services/appointmentService';
import Button from '../../components/patient/Button';
import toast from 'react-hot-toast';

const StaffAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load appointments.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredAppointments = appointments.filter(a =>
        a.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <h1 className="text-xl font-bold text-slate-800">Appointments Schedule</h1>
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
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-hospital-blue" />
                                Upcoming Appointments
                            </h2>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by patient or doctor..."
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
                                <div className="p-8 text-center text-slate-500">Loading appointments...</div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                                            <th className="px-6 py-4 font-medium">Patient</th>
                                            <th className="px-6 py-4 font-medium">Department</th>
                                            <th className="px-6 py-4 font-medium">Doctor</th>
                                            <th className="px-6 py-4 font-medium">Date & Time</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No appointments found.</td>
                                            </tr>
                                        ) : (
                                            filteredAppointments.map((appt) => (
                                                <tr key={appt.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-slate-800">{appt.patient_name}</div>
                                                        <div className="text-xs text-slate-500">{appt.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">{appt.department}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">{appt.doctor}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                                                        {new Date(appt.appointment_date).toLocaleDateString()} <br />
                                                        <span className="text-slate-500 text-xs font-normal">{appt.time_slot}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${appt.status === 'requested' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                                                            }`}>
                                                            {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Button size="sm" variant="secondary">View Details</Button>
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

export default StaffAppointments;
