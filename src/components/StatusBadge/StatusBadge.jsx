import React from "react";

// small colored pill that shows the booking status
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
