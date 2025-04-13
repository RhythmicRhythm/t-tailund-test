import { useState, useEffect } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { PiClockCountdownBold } from "react-icons/pi";

interface RightSliderProps {
  isActive: boolean;
  setActive: () => void;
  setInactive: () => void;
}

const RightSlider: React.FC<RightSliderProps> = ({
  isActive,
  setActive,
  setInactive,
}) => {
  const [temperature, setTemperature] = useState<number>(40);
  const minTemp = 0;
  const maxTemp = 80;
  const step = 10; // New step value for 10°C increments

  const fillHeight = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setActive();
  };

  const calculateSnappedTemperature = (clientY: number) => {
    const sliderElement = document.getElementById("temperature-slider-vertical");
    if (!sliderElement) return temperature;

    const sliderRect = sliderElement.getBoundingClientRect();
    const sliderHeight = sliderRect.height;
    const clickPositionY = clientY - sliderRect.top;

    // Calculate position (0 to 1)
    const position = 1 - (clickPositionY / sliderHeight);
    
    // Calculate raw temperature
    const rawTemp = minTemp + position * (maxTemp - minTemp);
    
    // Snap to nearest step (10°C)
    const snappedTemp = Math.round(rawTemp / step) * step;
    
    // Clamp between min and max
    return Math.max(minTemp, Math.min(maxTemp, snappedTemp));
  };

  useEffect(() => {
    if (!isActive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newTemp = calculateSnappedTemperature(e.clientY);
      if (newTemp !== temperature) {
        setTemperature(newTemp);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const newTemp = calculateSnappedTemperature(e.touches[0].clientY);
      if (newTemp !== temperature) {
        setTemperature(newTemp);
      }
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
  }, [isActive, temperature, setInactive]);

  // Rest of the component remains the same...
  const temperatureMarkers = [];
  for (let i = 0; i <= 8; i++) {
    const temp = i * 10;
    const position = 100 - ((temp - minTemp) / (maxTemp - minTemp)) * 100;

    temperatureMarkers.push(
      <div
        key={temp}
        className="flex items-center absolute w-full"
        style={{ top: `${position}%` }}
      >
        <div className="h-px w-6 bg-gray-300"></div>
        <div className="text-gray-400 text-sm ml-1">{temp}°C</div>
      </div>
    );
  }

  const generateDynamicDots = () => {
    const dots = [];
    const totalDots = 8;

    for (let i = 0; i < totalDots; i++) {
      const dotTemp = (totalDots - 1 - i) * (maxTemp / (totalDots - 1));
      const isActive = temperature >= dotTemp;

      dots.push(
        <div
          key={i}
          className={`w-1 h-1 rounded-full ${
            isActive ? "bg-gray-800" : "bg-gray-400"
          }`}
        ></div>
      );
    }

    return dots;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-2xl shadow-md">
      <div className="mb-10 flex items-center justify-between">
        <p className="text-xs text-left font-semibold">
          TEMPERATURE AT <br /> CONNECTION / JOINT
        </p>
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-sm">
          <PiClockCountdownBold size={20}/>
        </div>
      </div>

      <div className="flex justify-center mr-10">
        <div className="flex flex-col mr-0 items-center space-y-8">
          {generateDynamicDots()}
        </div>

        <div className="relative">
          <div
            className="absolute -left-5 z-10 cursor-pointer"
            style={{ top: `${100 - fillHeight}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-md">
              <TiArrowUnsorted className="text-white" />
            </div>
          </div>

          <div
            id="temperature-slider-vertical"
            className="relative w-6 h-64 bg-white rounded-full overflow-hidden ml-6"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className="absolute bottom-0 w-full bg-black rounded-b-full"
              style={{ height: `${fillHeight}%` }}
            ></div>
          </div>

          <div className="absolute top-0 left-auto right-0 h-full translate-x-2">
            {temperatureMarkers}
          </div>
        </div>
      </div>

      <div className="mt-10 text-4xl font-normal flex items-center justify-between">
        <p className="text-3xl">{temperature}°C</p>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-red-600 text-2xl font-bold">
          ?
        </div>
      </div>
    </div>
  );
};

export default RightSlider;