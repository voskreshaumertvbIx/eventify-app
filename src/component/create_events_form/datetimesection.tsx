"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  generateAvailableTimes,
  filterAvailableEndTimes,
} from "@/utils/timeUtils";
import TimePicker from "../reusable/TimePicker";
import MapWithSearch from "../MapWithSearch";

const DateTimeSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const { control } = useFormContext();

  useEffect(() => {
    setAvailableTimes(generateAvailableTimes());
  }, []);

  return (
    <section
      onClick={() => setIsEditing(true)}
      className="w-[700px] rounded-lg border p-4"
    >
      {!isEditing ? (
        <div className="flex">
          <div className="mr-5">
            <h1 className="text-xl font-bold">Date and time</h1>
            <p>Monday, February 17 · 10am - 12pm</p>
            <p>EET</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Location</h1>
            <p>Enter a location</p>
            <button
              className="text-blue-500 underline"
              onClick={() => setIsEditing(true)}
            >
              Show map
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-lg font-bold">Date and Time</h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1 block">
                Date
              </label>
              <Controller
                name="dateinfo.date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="main-input h-10" 
                    calendarClassName="custom-calendar"
                    placeholderText="Select date"
                  />
                )}
              />
            </div>

            <TimePicker
              label="Start Time"
              name="dateinfo.start"
              control={control}
              availableTimes={availableTimes}
              rules={{ required: "Start time is required" }}
              onChangeCallback={(value) => setStartTime(value)}
              className="h-10" // Опционально: Добавьте одинаковую высоту для TimePicker
            />

            <TimePicker
              label="End Time"
              name="dateinfo.end"
              control={control}
              availableTimes={filterAvailableEndTimes(
                startTime,
                availableTimes,
              )}
              rules={{
                required: "End time is required",
                validate: (endTime) => {
                  if (!startTime) return "Please select a start time first";
                  const start = new Date(`1970-01-01T${startTime}:00Z`);
                  const end = new Date(`1970-01-01T${endTime}:00Z`);
                  return end > start || "End time must be after start time";
                },
              }}
              className="h-10"
            />
          </div>

          <MapWithSearch />
        </>
      )}
    </section>
  );
};

export default DateTimeSection;
