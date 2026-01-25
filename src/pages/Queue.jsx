import React, { useState, useEffect, useMemo } from "react";
import {
  useGetQueueQuery,
  useCallPatientMutation,
  useCompleteVisitMutation,
} from "../api/patientApi";
import PatientCard from "../components/PatientCard";
import toast from "react-hot-toast";

const Queue = () => {
  const { data: patients = [], isLoading, refetch } = useGetQueueQuery();
  const [callPatient] = useCallPatientMutation();
  const [completeVisit] = useCompleteVisitMutation();

  const [filter, setFilter] = useState("All");

  // 🔁 Force re-render every minute (for live time updates)
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🔁 Auto-refresh backend data every 30s
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleCall = async (id) => {
    try {
      await callPatient(id).unwrap();
      toast.success("Patient called to room");
      refetch();
    } catch (err) {
      toast.error(err.data?.error || "Failed to call patient");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeVisit(id).unwrap();
      toast.success("Visit completed");
      refetch();
    } catch (err) {
      toast.error(err.data?.error || "Failed to complete visit");
    }
  };

  // ✅ ALL patients (single source of truth)
  const allPatients = patients;

  // ✅ Stats should ALWAYS be based on all patients
  const stats = useMemo(
    () => ({
      total: allPatients.length,
      urgent: allPatients.filter(p => p.appointment_type === "Urgent").length,
      waiting: allPatients.filter(p => p.status === "waiting").length,
      inRoom: allPatients.filter(p => p.status === "in_room").length,
      completed: allPatients.filter(p => p.status === "completed").length,
    }),
    [allPatients]
  );

  // ✅ Filters never mutate source data
  const filteredPatients = useMemo(() => {
    switch (filter) {
      case "Urgent":
        return allPatients.filter(p => p.appointment_type === "Urgent");
      case "Waiting":
        return allPatients.filter(p => p.status === "waiting");
      case "In Room":
        return allPatients.filter(p => p.status === "in_room");
      case "Completed":
        return allPatients.filter(p => p.status === "completed");
      case "All":
      default:
        return allPatients;
    }
  }, [filter, allPatients]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-2 md:px-6">
      {/* ---------------- Stats Cards ---------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
        <MemoStatCard label="Total Patients" value={stats.total} />
        <MemoStatCard label="Urgent" value={stats.urgent} color="red" />
        <MemoStatCard label="Waiting" value={stats.waiting} color="yellow" />
        <MemoStatCard label="In Room" value={stats.inRoom} color="blue" />
        <MemoStatCard label="Completed" value={stats.completed} color="green" />
      </div>

      {/* ---------------- Filters ---------------- */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        {["All", "Urgent", "Waiting", "In Room", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 md:px-4 py-2 md:py-2.5 rounded-md font-medium text-sm transition min-h-[44px] flex items-center justify-center
              ${filter === f
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---------------- Patient List ---------------- */}
      <div className="flex flex-col gap-3">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-2">🏥</div>
            <p className="font-medium">No patients found</p>
            <p className="text-sm">
              Patients matching the selected filter will appear here
            </p>
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

// ---------------- StatCard Component ----------------
const StatCard = ({ label, value, color = "gray" }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center shadow-sm hover:shadow-md transition">
    <p className="text-xs md:text-sm text-gray-500">{label}</p>
    <p
      className={`text-lg md:text-2xl font-bold mt-1 ${color !== "gray" ? `text-${color}-600` : "text-gray-800"
        }`}
    >
      {value}
    </p>
  </div>
);

const MemoStatCard = React.memo(StatCard);

export default Queue;
