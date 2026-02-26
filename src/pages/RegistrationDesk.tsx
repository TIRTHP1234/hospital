import React from 'react';
import { useRegistration } from '@/hooks/useRegistration';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { PatientList } from '@/components/registration/PatientList';
import { AlertsWidget } from '@/components/dashboard/AlertsWidget/AlertsWidget';

export const RegistrationDesk: React.FC = () => {
    const {
        admissions,
        departments,
        loading,
        error,
        admitPatient,
        dischargePatient
    } = useRegistration();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Registration Desk</h1>
                    <p className="text-gray-500 mt-1">Manage patient admissions and discharges</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                <strong>Error:</strong> {error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Registration Form & Alerts) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <RegistrationForm
                        departments={departments}
                        onSubmit={async (data) => {
                            const patientData = {
                                full_name: data.full_name,
                                date_of_birth: data.date_of_birth,
                                zip_code: data.zip_code
                            };
                            await admitPatient(patientData, data.department_id);
                        }}
                        loading={loading}
                    />
                    <div className="flex-1">
                        <AlertsWidget />
                    </div>
                </div>

                {/* Right Column (Patient List) */}
                <div className="lg:col-span-2">
                    <PatientList
                        admissions={admissions}
                        onDischarge={dischargePatient}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};
