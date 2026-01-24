import React from "react";

const StatusBadge = ({ type, children }) => {
  let colorClass = "";

  switch (type) {
    case "Urgent":
      colorClass = "bg-red-500";
      break;
    case "Follow-up":
      colorClass = "bg-green-500";
      break;
    case "New Patient":
      colorClass = "bg-blue-500";
      break;
    case "waiting":
      colorClass = "bg-gray-300 text-gray-800";
      break;
    case "in_room":
      colorClass = "bg-teal-400";
      break;
    default:
      colorClass = "bg-gray-400";
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${colorClass}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
