import React, { useState } from 'react';
import { useCheckInPatientMutation } from '../api/patientApi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { User, FileText, CalendarCheck, LayoutDashboard } from 'lucide-react';

const CheckIn = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [appointmentType, setAppointmentType] = useState('New Patient');

  const [checkInPatient, { isLoading }] = useCheckInPatientMutation();
  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error('Patient name is required');

    try {
      await checkInPatient({ name, reason, appointment_type: appointmentType }).unwrap();
      toast.success('Patient checked in successfully');
      setName('');
      setReason('');
      setAppointmentType('New Patient');
    } catch (err) {
      toast.error(err.error || 'Failed to check in');
    }
  };

  return (
    <div className="min-h-auto px-4 py-6 md:py-2 bg-neutral-100 flex justify-center w-full">
      <div className="w-full flex flex-col gap-4 items-center">

        {/* Dashboard Button */}
        <Link
          to={user ? "/dashboard" : "/login"}
          className="bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2.5 px-5 rounded-lg transition-all text-sm md:text-base self-start min-h-[44px] flex items-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          
          {/* HEADER */}
          <div className="bg-black text-center py-5 px-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-blue-100">
              PATIENT CHECK-IN
            </h2>
            <div className="border-t border-white/30 w-11/12 mx-auto my-2"></div>
            <p className="text-xs md:text-sm text-blue-100">
              Register and queue patients efficiently
            </p>
          </div>

          {/* FORM */}
          <div className="p-4 md:p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Patient Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                  Reason for Visit
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    rows={2}
                    placeholder="Optional"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                </div>
              </div>

              {/* Appointment Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                  >
                    <option>New Patient</option>
                    <option>Follow-up</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isLoading ? 'Checking In...' : 'Check In Patient'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
