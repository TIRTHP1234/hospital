import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, AlertCircle } from 'lucide-react';
import Navbar from '../../components/patient/Navbar';
import Footer from '../../components/patient/Footer';
import InputField from '../../components/patient/InputField';
import SelectDropdown from '../../components/patient/SelectDropdown';
import TextareaField from '../../components/patient/TextareaField';
import Button from '../../components/patient/Button';
import { submitPatientQuery } from '../../services/queryService';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
    { value: 'General Medicine', label: 'General Medicine' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Pediatrics', label: 'Pediatrics' },
];

const URGENCY_LEVELS = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
];

const PatientQuery = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        symptoms: '',
        message: '',
        urgency_level: 'Normal',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitPatientQuery(formData);
            toast.success('Query submitted successfully!');
            navigate('/confirmation', { state: { type: 'query', queryId: result.id } });
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit query. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-hospital-light">
            <Navbar />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-hospital-blue rounded-2xl mb-4">
                            <MessageSquare className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">Submit a Health Query</h1>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Please provide details about your concern. Our AI-assisted staff will review your information and respond promptly.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-sm text-slate-600">
                            <AlertCircle className="h-4 w-4 text-hospital-blue" />
                            <span>For medical emergencies, please call your local emergency number immediately.</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Full Name"
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Email Address"
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Phone Number"
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <SelectDropdown
                                    label="Department"
                                    id="department"
                                    options={DEPARTMENTS}
                                    required
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-6 pt-2 border-t border-slate-100">
                                <TextareaField
                                    label="Symptoms / Core Concern"
                                    id="symptoms"
                                    placeholder="Briefly describe your main symptoms..."
                                    rows={3}
                                    required
                                    value={formData.symptoms}
                                    onChange={handleChange}
                                />
                                <TextareaField
                                    label="Additional Message (Optional)"
                                    id="message"
                                    placeholder="Any other details we should know?"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                                <SelectDropdown
                                    label="Urgency Level"
                                    id="urgency_level"
                                    options={URGENCY_LEVELS}
                                    required
                                    value={formData.urgency_level}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full text-lg"
                                    isLoading={isSubmitting}
                                >
                                    Submit Query securely
                                </Button>
                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Your data is submitted securely and kept confidential.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PatientQuery;
