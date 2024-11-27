import React, { useState, useEffect } from "react";
import DateField from "../../../../constants/DateField"; // Assuming DateField component works correctly

const Storage = ({
  setIsComplete,
  existingData, // Data passed from previous scan (if any)
  onDateChange, // Function to handle save action (optional)
}) => {
  const [disposedStatus, setDisposedStatus] = useState(0); // Default to 0 (not disposed)
  const [startDate, setStartDate] = useState(""); // Initialize startDate

  useEffect(() => {
    if (existingData) {
      // Update state with existing data if available
      setDisposedStatus(
        existingData.isDisposed === null ||
          existingData.isDisposed === undefined
          ? 0
          : existingData.isDisposed,
      );
      setStartDate(existingData.startDate || ""); // Set start date if available
    }
  }, [existingData]);

  // Handle date change from DateField component
  const handleDateChange = (date) => {
    setStartDate(date);
    if (onDateChange) {
      onDateChange(date); // Notify parent component about date change
    }

    // Notify parent component about completion status (date and disposed status)
    if (setIsComplete) {
      setIsComplete(date !== "" && disposedStatus === 0);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border p-2 w-full">
        <h2 className="font-semibold mb-6">Storage Status</h2>
        <div className="flex flex-col mb-4">
          <label>Disposed Status:</label>
          <span
            className={
              disposedStatus === 0 ? "text-red-500 font-bold" : "text-green-500"
            }
          >
            {disposedStatus === 0 ? "No" : "Yes"}
          </span>
        </div>
        <div>
          <label>Start Date:</label>
          <DateField onChange={handleDateChange} value={startDate} />
        </div>
        <div>
          <label>Process</label>
        </div>
      </div>
    </div>
  );
};

export default Storage;
