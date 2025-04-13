import { useState } from "react";
import { HiOutlineSignal } from "react-icons/hi2";

const ExperThermSensor = () => {
  const [deltaT, setDeltaT] = useState(20);

  const getStatus = (temp: any) => {
    if (temp >= 40)
      return { text: "Critical", color: "bg-red-200 text-red-600" };
    if (temp >= 30)
      return { text: "Warning", color: "bg-yellow-200 text-yellow-600" };
    return { text: "Healthy", color: "bg-green-200 text-green-600" };
  };

  const status = getStatus(deltaT);
  return (
    <div className=" bg-gray-100 rounded-lg p-4">
      {/* Header */}
      <h1 className="text-gray-700 font-bold mb-8 text-xs text-left">
        EXPERTHERM SENSOR WITH
        <br />
        DELTA-T MEASUREMENT<span className="text-red-500">*</span>
      </h1>

      {/* Temperature Display */}
      <div className="bg-black text-white p-2 rounded flex justify-between items-center mb-3">
        <span>ΔT:</span>
        <span className="font-bold text-lg">{deltaT}°C</span>
      </div>

      {/* Status Indicator */}
      <div
        className={`${status.color} p-2 rounded flex justify-between items-center mb-4`}
      >
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span className="font-medium">{status.text}</span>
        {/* Signal icon */}
        <div className="">
          <HiOutlineSignal size={20} className="text-green-600" />
        </div>
      </div>

      {/* Alarm Settings */}
      <div className="text-sm text-gray-700 text-left">
        <div className=" mb-1">
          <span className="text-red-500 font-bold text-sm">*</span> Alarm is set
          at:
        </div>
        <div>ΔT ≥ 40°C - Critical alarm</div>
        <div>ΔT ≥ 30°C - Warning alarm</div>
        <div>ΔT &lt; 30°C - No alarm (Healthy)</div>
      </div>
    </div>
  );
};

export default ExperThermSensor;
