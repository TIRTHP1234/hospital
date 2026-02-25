import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { format } from 'date-fns'
import { useDepartmentPatients } from '@/hooks/useDepartmentPatients'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

interface DrillDownProps {
    departmentId: number
    onClose: () => void
}

export const DepartmentDrillDown: React.FC<DrillDownProps> = ({ departmentId, onClose }) => {
    const { data, isLoading } = useDepartmentPatients(departmentId)

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                                            Department Patients
                                        </Dialog.Title>

                                        {isLoading ? (
                                            <div className="py-12"><LoadingSpinner /></div>
                                        ) : (
                                            <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bed</th>
                                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Admitted At</th>
                                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {data?.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={4} className="py-8 text-center text-sm text-gray-500">No recent patients in this department.</td>
                                                            </tr>
                                                        ) : (
                                                            data?.map((admission: any) => (
                                                                <tr key={admission.id}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                                        {admission.patients?.full_name || 'Unknown Patient'}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{admission.bed_number || 'TBD'}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        {format(new Date(admission.admitted_at), 'MMM d, h:mm a')}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                        {admission.discharged_at ? (
                                                                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Discharged</span>
                                                                        ) : (
                                                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Admitted</span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
