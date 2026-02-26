import React, { useState } from 'react';
import type { Department } from '@/hooks/useRegistration';
import { toast } from 'react-hot-toast';

interface RegistrationFormProps {
    departments: Department[];
    onSubmit: (data: { full_name: string; date_of_birth: string; zip_code: string; department_id: number }) => Promise<void>;
    loading: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ departments, onSubmit, loading }) => {
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [departmentId, setDepartmentId] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !dob || !departmentId) return;

        try {
            await onSubmit({
                full_name: fullName,
                date_of_birth: dob,
                zip_code: zipCode,
                department_id: Number(departmentId)
            });
            toast.success(`${fullName} admitted successfully!`);

            // Reset form on success
            setFullName('');
            setDob('');
            setZipCode('');
            setDepartmentId('');
        } catch (error) {
            toast.error("Failed to admit patient.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Admit New Patient</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                </div>

                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        placeholder="12345"
                    />
                </div>

                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        id="department"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(Number(e.target.value))}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border bg-white"
                    >
                        <option value="" disabled>Select a department...</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !fullName || !dob || !departmentId}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all
                        ${loading || !fullName || !dob || !departmentId ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : 'Admit Patient'}
                </button>
            </form>
        </div>
    );
};
