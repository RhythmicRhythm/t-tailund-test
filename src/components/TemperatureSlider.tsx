import { useState, useEffect } from "react";
import { TiArrowUnsorted } from "react-icons/ti";

interface TemperatureSliderProps {
  isActive: boolean;
  setActive: () => void;
  setInactive: () => void;
}

const TemperatureSlider = ({
  isActive,
  setActive,
  setInactive,
}: TemperatureSliderProps) => {
  const [temperature, setTemperature] = useState(20);
  const minTemp = 10;
  const maxTemp = 40;

  const handlePosition = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;

  const getEnvironmentType = (temp: number) => {
    if (temp <= 15) return "COOL ENVIRONMENT";
    if (temp >= 30) return "WARM ENVIRONMENT";
    return "NORMAL ENVIRONMENT";
  };

  const getEnvironmentIndex = () => {
    if (temperature <= 15) return 0;
    if (temperature >= 30) return 2;
    return 1;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setActive();
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    // Don't respond to clicks if we're in the middle of dragging
    if (isActive) return;

    const sliderRect = e.currentTarget.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const clickPosition = e.clientX - sliderRect.left;

    let newTemp = minTemp + (clickPosition / sliderWidth) * (maxTemp - minTemp);
    newTemp = Math.max(minTemp, Math.min(maxTemp, Math.round(newTemp)));
    setTemperature(newTemp);

    // Briefly activate then deactivate to handle the click without entering drag mode
    setActive();
    setTimeout(() => setInactive(), 100);
  };

  useEffect(() => {
    // Only add event listeners if this slider is active
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const sliderElement = document.getElementById(
        "temperature-slider-horizontal"
      );
      if (!sliderElement) return;

      const sliderRect = sliderElement.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const clickPosition = e.clientX - sliderRect.left;

      let newTemp =
        minTemp + (clickPosition / sliderWidth) * (maxTemp - minTemp);
      newTemp = Math.max(minTemp, Math.min(maxTemp, Math.round(newTemp)));
      setTemperature(newTemp);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const sliderElement = document.getElementById(
        "temperature-slider-horizontal"
      );
      if (!sliderElement) return;

      const sliderRect = sliderElement.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const touchPosition = touch.clientX - sliderRect.left;

      let newTemp =
        minTemp + (touchPosition / sliderWidth) * (maxTemp - minTemp);
      newTemp = Math.max(minTemp, Math.min(maxTemp, Math.round(newTemp)));
      setTemperature(newTemp);
    };

    const handleMouseUp = () => {
      setInactive();
    };

    const handleTouchEnd = () => {
      setInactive();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, minTemp, maxTemp, setInactive]);

  const environmentType = getEnvironmentType(temperature);
  const envIndex = getEnvironmentIndex();

  return (
    <div className="p-6 bg-gray-100 rounded-2xl shadow-md w-full">
      <div
        id="temperature-slider-horizontal"
        className="relative h-8 rounded-full mb-2 cursor-pointer"
        style={{
          background: "linear-gradient(to right, #60a5fa, #e5e7eb, #f87171)",
        }}
        onClick={handleSliderClick}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: `${handlePosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg cursor-grab">
            <TiArrowUnsorted className="text-white rotate-90" />
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-12">
          <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
        </div>
      </div>

      <div className="flex justify-between px-4 mb-4 text-gray-700 text-sm">
        <span>10°C</span>
        <span>20°C</span>
        <span>40°C</span>
      </div>

      <div className="flex justify-between relative mt-4">
        <div
          className={`px-4 py-1 rounded text-xs text-center flex-1 ${
            temperature <= 15 ? "bg-blue-200 font-bold" : "bg-blue-100"
          }`}
        >
          COOL ENVIRONMENT
        </div>
        <div
          className={`px-4 py-1 rounded text-xs text-center flex-1 mx-2 ${
            temperature > 15 && temperature < 30
              ? "bg-gray-300 font-bold"
              : "bg-gray-200"
          }`}
        >
          NORMAL ENVIRONMENT
        </div>
        <div
          className={`px-4 py-1 rounded text-xs text-center flex-1 ${
            temperature >= 30 ? "bg-red-200 font-bold" : "bg-red-100"
          }`}
        >
          WARM ENVIRONMENT
        </div>

        <div
          className="absolute -top-4 transform -translate-x-1/2"
          style={{
            left: envIndex === 0 ? "16.66%" : envIndex === 1 ? "50%" : "83.33%",
          }}
        >
          <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSlider;
