import React from "react";
import Disposal from "./status/Disposal";
import Storage from "./status/Storage";
import Process from "./status/Process";
import Dismounting from "./status/Dismounting";
import Mounting from "./status/Mounting";
import { containerClass } from "../../../styles/components";

export const QrHeader = () => {
  return (
    <div className="flex flex-col w-full py-8 px-6 ">
      <label>Back</label>
    </div>
  );
};

export const CylinderInfo = ({
  selectedStatus,
  selectedProcessorStatus,
  setIsComplete,
  onDateChange,
  isNewScan, // Flag for new scan
  onDisposedChange, // Callback for disposal change
  existingData, // Data passed from the previous scan
  handleSaveStorageData,
  selectedDate,
}) => {
  // Common props that will be passed to each component
  const commonProps = {
    setIsComplete,
    existingData,
  };

  console.log("Current Selected Statusrrr:", selectedStatus);

  // Render content based on selectedStatus
  const renderContent = () => {
    console.log("Rendering content for strrratus:", selectedStatus); // Debugging log

    switch (selectedStatus) {
      case "Disposal":
        return (
          <div className={containerClass}>
            <Disposal
              {...commonProps}
              onDateChange={onDateChange}
              onDisposedChange={onDisposedChange}
            />
          </div>
        );
      case "Storage":
        return (
          <div className={containerClass}>
            <Storage
              {...commonProps}
              isNewScan={isNewScan}
              onSaveData={handleSaveStorageData}
              onDateChange={onDateChange}
              existingData={existingData}
            />
          </div>
        );
      case "Process":
        return (
          <div className={containerClass}>
            <Process
              {...commonProps}
              selectedProcessorStatus={selectedProcessorStatus}
            />
          </div>
        );
      case "Mounted":
        return (
          <div className={containerClass}>
            <Mounting {...commonProps} />
          </div>
        );
      case "Dismounted":
        return (
          <div className={containerClass}>
            <Dismounting {...commonProps} />
          </div>
        );
      default:
        return <div>Please select a valid status.</div>; // Improved default message
    }
  };

  return <>{renderContent()}</>; // Return the rendered content
};
