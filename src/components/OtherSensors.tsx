import { useState } from "react";
import { HiOutlineSignal } from "react-icons/hi2";

const OtherSensors = () => {
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
      <h1 className="text-gray-700 font-bold mb-16 text-xs text-left">
        OTHER SENSOR WITH ABSOLUTE
        <br />
        TEMPERATURE MEASUREMENT<span className="text-red-500">*</span>
      </h1>

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
          <span className="text-red-500 font-bold text-sm">*</span> Alarms level
          settings:
        </div>
        <div>Absolute Temperature</div>
        <div>≥ 60°C - Alarm</div>
        <div>&lt; 60°C - No alarm (Healthy)</div>
      </div>
    </div>
  );
};

export default OtherSensors;
