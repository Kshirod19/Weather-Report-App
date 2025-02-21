import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data, onClose }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <motion.div
      className="fixed top-0 left-0 z-30 flex flex-col items-center justify-center w-full h-screen px-6 py-5 overflow-y-auto text-white bg-blue-900"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2 className="flex gap-2 mt-10 mb-5 text-2xl font-bold text-center">
        <span className="text-blue-200">7-Day Forecast for</span> {data.city.name}
      </h2>

      <Accordion allowZeroExpanded className="w-full max-w-2xl">
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx} className="mb-3">
            <AccordionItemHeading>
              <AccordionItemButton className="flex items-center justify-between w-full px-3 py-1 transition rounded-lg bg-white/10 hover:bg-white/20">
                <span className="text-lg font-semibold">{forecastDays[idx]}</span>
                <div className="flex items-center gap-3">
                  <img
                    src={`Weathers/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="h-[40px] w-[40px]"
                  />
                  <p className="text-lg font-medium">
                    {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
                  </p>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="p-3 rounded-lg bg-white/10">
                <p>Humidity: {item.main.humidity}%</p>
                <p>Clouds: {item.clouds.all}%</p>
                <p>Wind Speed: {item.wind.speed} m/s</p>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Back Button */}
      <button
        onClick={onClose}
        className="px-4 py-1 mt-4 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700"
      >
        Back
      </button>
    </motion.div>
  );
};

export default Forecast;
