import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const PatientCard = ({ patient, onCall, onComplete }) => {
  const isCompleted = patient.status === "completed";

  // ---------------- Colors ----------------
  const appointmentColors = {
    "Urgent": "bg-red-100 text-red-600 border-red-200",
    "Follow-up": "bg-yellow-100 text-yellow-600 border-yellow-200",
    "New Patient": "bg-blue-100 text-blue-600 border-blue-200",
  };

  const statusColors = {
    "waiting": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "in_room": "bg-blue-100 text-blue-700 border-blue-200",
    "completed": "bg-green-100 text-green-600 border-green-200",
  };

  const statusLabel = {
    "waiting": "Waiting",
    "in_room": "In Room",
    "completed": "Completed",
  };

  // ---------------- Live Wait Time ----------------
  const calculateWaitMinutes = () => {
    if (!patient.checked_in_at) return 0;

    // Convert checked_in_at from UTC to local
    const checkedIn = dayjs.utc(patient.checked_in_at).local();
    const now = dayjs();

    const diff = now.diff(checkedIn, "minute");
    return diff >= 0 ? diff : 0;
  };

  const [waitMinutes, setWaitMinutes] = useState(calculateWaitMinutes());

  useEffect(() => {
    // Update every minute
    if (!isCompleted) {
      const interval = setInterval(() => {
        setWaitMinutes(calculateWaitMinutes());
      }, 60000);

      // Initialize immediately
      setWaitMinutes(calculateWaitMinutes());

      return () => clearInterval(interval);
    }
  }, [patient.checked_in_at, isCompleted]);

  const formatWaitTime = (totalMinutes) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} min${totalMinutes !== 1 ? "s" : ""}`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };


  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-5 transition-shadow w-full
        ${isCompleted ? "opacity-80" : "hover:shadow-md"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Patient Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-1 mb-2 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-full">{patient.name}</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 w-fit
              ${appointmentColors[patient.appointment_type] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
              {patient.appointment_type}
            </span>
          </div>

          <p className="text-gray-600 text-sm sm:text-base truncate">
            {patient.reason || "No reason provided"}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
              ${statusColors[patient.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
              {statusLabel[patient.status] || patient.status}
            </span>

            {!isCompleted && (
              <span className="flex items-center text-gray-500">
                ⏱️ Waiting {formatWaitTime(waitMinutes)}
              </span>
            )}

            {isCompleted && (
              <span className="flex items-center text-green-600 font-medium">
                ✅ Visit Completed
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {!isCompleted && (
          <div className="flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
            {patient.status === "waiting" && (
              <button
                onClick={() => onCall(patient.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
              >
                Call to Room
              </button>
            )}

            <button
              onClick={() => onComplete(patient.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
            >
              Complete Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
