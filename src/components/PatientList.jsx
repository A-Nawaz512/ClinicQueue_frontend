// src/pages/PatientList.jsx
import React, { useEffect } from "react";
import { useGetQueueQuery, useCallPatientMutation, useCompleteVisitMutation } from "../api/patientApi";
import PatientCard from "../components/PatientCard";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const PatientList = () => {
  const { data: patients = [], isLoading, refetch } = useGetQueueQuery();
  const [callPatient] = useCallPatientMutation();
  const [completeVisit] = useCompleteVisitMutation();

  const { filter } = useParams(); // filter can be: waiting, in-room, completed, urgent, follow-up

  // Auto-refresh queue every 30s
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Filter patients based on sidebar selection
  const filteredPatients = patients.filter((p) => {
    switch (filter) {
      case "waiting":
        return p.status === "waiting";
      case "in-room":
        return p.status === "in_room";
      case "completed":
        return p.status === "completed";
      case "urgent":
        return p.appointment_type === "Urgent";
      case "follow-up":
        return p.appointment_type === "Follow-up";
      default:
        return true;
    }
  });

  const handleCall = async (id) => {
    try {
      await callPatient(id).unwrap();
      toast.success("Patient called to room");
      refetch();
    } catch (error) {
      toast.error(error.data?.error || "Failed to call patient");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeVisit(id).unwrap();
      toast.success("Visit completed");
      refetch();
    } catch (error) {
      toast.error(error.data?.error || "Failed to complete visit");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Page title and emoji
  const titleMap = {
    "waiting": "Waiting Patients ⏳",
    "in-room": "Patients In Room 🚪",
    "completed": "Completed Visits ✅",
    "urgent": "Urgent Patients ⚠️",
    "follow-up": "Follow-Up Patients 🔄",
  };

  return (
    <div className="flex-1 p-6 bg-neutral-100">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">{titleMap[filter] || "Patients"}</h2>
        <p className="text-gray-600">
          {filteredPatients.length} patient{filteredPatients.length !== 1 && "s"}
        </p>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">🏥</div>
            <p className="text-lg font-medium">No patients found</p>
            <p className="text-sm">Check back later for new check-ins</p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onCall={handleCall}
              onComplete={handleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;
