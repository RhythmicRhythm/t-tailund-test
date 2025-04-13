import { useState } from "react";
import RightSlider from "../components/RightSlider";
import TemperatureSlider from "../components/TemperatureSlider";
import ExperThermSensor from "../components/ExperThermSensor";
import OtherSensors from "../components/OtherSensors";
import NormalEnviroment from "../components/NormalEnviroment";
import { IoMdClose } from "react-icons/io";

const Home = () => {
  const [activeSlider, setActiveSlider] = useState<
    null | "horizontal" | "vertical"
  >(null);
  const [jointTemp, setJointTemp] = useState(20);
  console.log(jointTemp)

  const activateHorizontalSlider = () => {
    setActiveSlider("horizontal");
  };

  const activateVerticalSlider = () => {
    setActiveSlider("vertical");
  };

  const deactivateSliders = () => {
    setActiveSlider(null);
  };

  return (
    <div>
      <div className="w-full min-h-screen">
        {/* Main modal container */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 rounded-lg w-full max-w-6xl mx-auto p-6 relative">
          {/* Header area */}
          <div className="absolute top-4 left-4">
            <div className="h-8 w-40"></div>
          </div>

          {/* Close button */}
          <div className="absolute top-4 right-4">
            <div className="h-8 w-8 bg-white rounded-md p-1 shadow-sm">
              <IoMdClose size={20} className="text-red-600" />
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <div className="p-2 w-3/4">
              <div className="flex gap-4">
                <div className="flex-grow grid grid-cols-3 gap-4">
                  {/* Left panel */}
                  <div className="max-h-72 bg-gray-100">
                    <ExperThermSensor />
                  </div>
                  <div className="max-h-72 bg-gray-100">
                    <OtherSensors />
                  </div>
                  <div className="bg-gray-100 rounded-lg h-72">
                    <NormalEnviroment />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <TemperatureSlider
                  isActive={activeSlider === "horizontal"}
                  setActive={activateHorizontalSlider}
                  setInactive={deactivateSliders}
                />
              </div>
            </div>
            <div className="w-1/4">
              <RightSlider
                isActive={activeSlider === "vertical"}
                setActive={activateVerticalSlider}
                setInactive={deactivateSliders}
                temperature={jointTemp}
                setTemperature={setJointTemp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
