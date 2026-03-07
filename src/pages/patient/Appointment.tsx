import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import Navbar from '../../components/patient/Navbar';
import Footer from '../../components/patient/Footer';
import InputField from '../../components/patient/InputField';
import SelectDropdown from '../../components/patient/SelectDropdown';
import TextareaField from '../../components/patient/TextareaField';
import Button from '../../components/patient/Button';
import { createAppointment } from '../../services/appointmentService';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
    { value: 'General Medicine', label: 'General Medicine' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Pediatrics', label: 'Pediatrics' },
];

const TIME_SLOTS = [
    { value: '09:00 AM', label: '09:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '01:00 PM', label: '01:00 PM' },
    { value: '02:00 PM', label: '02:00 PM' },
    { value: '03:00 PM', label: '03:00 PM' },
    { value: '04:00 PM', label: '04:00 PM' },
];

const Appointment = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        patient_name: '',
        email: '',
        phone: '',
        department: '',
        doctor: '',
        appointment_date: '',
        time_slot: '',
        reason: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createAppointment(formData);
            toast.success('Appointment requested successfully!');
            navigate('/confirmation', { state: { type: 'appointment' } });
        } catch (error) {
            console.error(error);
            toast.error('Failed to book appointment. Please try again.');
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
                            <Calendar className="h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">Book an Appointment</h1>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Schedule a visit with our medical professionals. Select your preferred date and time.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4 text-hospital-blue" />
                            <span>Please arrive 15 minutes before your scheduled appointment time.</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Patient Name"
                                    id="patient_name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.patient_name}
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                                <InputField
                                    label="Preferred Doctor (Optional)"
                                    id="doctor"
                                    placeholder="Dr. Smith"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                />
                                {/* A spacer for the grid if needed, or place something else here. We'll leave it as is so Date is below */}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                                <InputField
                                    label="Appointment Date"
                                    id="appointment_date"
                                    type="date"
                                    required
                                    value={formData.appointment_date}
                                    onChange={handleChange}
                                />
                                <SelectDropdown
                                    label="Preferred Time Slot"
                                    id="time_slot"
                                    options={TIME_SLOTS}
                                    required
                                    value={formData.time_slot}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                                <TextareaField
                                    label="Reason for Visit"
                                    id="reason"
                                    placeholder="Please briefly describe why you need to be seen..."
                                    rows={3}
                                    required
                                    value={formData.reason}
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
                                    Confirm Booking Request
                                </Button>
                                <p className="text-center text-xs text-slate-500 mt-4">
                                    You will receive a confirmation once the schedule is reviewed.
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

export default Appointment;
