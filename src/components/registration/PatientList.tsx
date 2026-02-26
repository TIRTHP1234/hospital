import React, { useState, useMemo } from 'react';
import type { Admission } from '@/hooks/useRegistration';
import { Clock, CheckCircle, UserMinus, Search, Filter } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';

interface PatientListProps {
    admissions: Admission[];
    onDischarge: (admissionId: string) => void;
    loading: boolean;
}

export const PatientList: React.FC<PatientListProps> = ({ admissions, onDischarge, loading }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');

    // Create a unique list of departments for the filter dropdown based on actual data
    const departments = useMemo(() => {
        const depts = new Set(admissions.map(a => a.department.name));
        return Array.from(depts);
    }, [admissions]);

    // Sort and filter logic
    const displayedAdmissions = useMemo(() => {
        return admissions
            .filter(a => {
                const matchesSearch = a.patient.full_name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesDept = departmentFilter === 'all' || a.department.name === departmentFilter;
                return matchesSearch && matchesDept;
            })
            .sort((a, b) => {
                if (a.discharged_at && !b.discharged_at) return 1;
                if (!a.discharged_at && b.discharged_at) return -1;
                // Then by admission date descending
                return new Date(b.admitted_at).getTime() - new Date(a.admitted_at).getTime();
            });
    }, [admissions, searchQuery, departmentFilter]);

    const activeCount = displayedAdmissions.filter(a => !a.discharged_at).length;

    const handleDischarge = async (id: string, name: string) => {
        try {
            await onDischarge(id);
            toast.success(`${name} has been discharged.`);
        } catch (error) {
            toast.error("Failed to discharge patient.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Current & Recent Patients</h2>
                    <p className="text-sm text-gray-500">Live patient directory</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Department Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                        >
                            <option value="all">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm whitespace-nowrap">
                            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
                            {activeCount} Active
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white sticky top-0 shadow-sm z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Time Out</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading && admissions.length === 0 ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={`skeleton-${idx}`}>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div><div className="h-3 bg-gray-100 rounded animate-pulse w-24"></div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-5 bg-gray-200 rounded-full animate-pulse w-28"></div></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div></td>
                                </tr>
                            ))
                        ) : displayedAdmissions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                                    No patients found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            displayedAdmissions.map((admission) => {
                                const isDischarged = !!admission.discharged_at;

                                return (
                                    <tr key={admission.id} className={isDischarged ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50 transition-colors'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-medium ${isDischarged ? 'text-gray-500' : 'text-gray-900'}`}>
                                                    {admission.patient.full_name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    DOB: {format(new Date(admission.patient.date_of_birth), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{admission.department.name}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                                {format(new Date(admission.admitted_at), 'h:mm a, MMM d')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isDischarged ? (
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <CheckCircle className="w-4 h-4 mr-1 text-gray-400" />
                                                    {format(new Date(admission.discharged_at!), 'h:mm a')}
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    In Hospital ({formatDistanceToNow(new Date(admission.admitted_at))} ago)
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {!isDischarged ? (
                                                <button
                                                    onClick={() => handleDischarge(admission.id, admission.patient.full_name)}
                                                    disabled={loading}
                                                    className="text-red-600 hover:text-red-900 flex items-center justify-end w-full group"
                                                >
                                                    <span className="mr-1">Discharge</span>
                                                    <UserMinus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">Discharged</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
