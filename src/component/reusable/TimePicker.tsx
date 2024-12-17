import React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface TimePickerProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  availableTimes: string[];
  onChangeCallback?: (value: string) => void;
  className?: string;
}

const TimePicker = <T extends Record<string, any>>({
  label,
  availableTimes,
  onChangeCallback,
  control,
  name,
  rules,
  className = "",
}: TimePickerProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <select
              className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 scrollbar-track-gray-100 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-background-dark scroll-thumb-rounded-full overflow-y-auto rounded-md border px-1 py-3 dark:bg-background-dark dark:text-text-dark"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChangeCallback?.(e.target.value);
              }}
            >
              {availableTimes.map((time) => (
                <option className="dark:bg-black" key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TimePicker;
