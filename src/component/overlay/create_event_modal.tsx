import { uiAtom } from "@/atoms/state";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useFormContext } from "react-hook-form";

const CreateEventModal = () => {
  const setUi = useSetAtom(uiAtom);
  const { setValue, register } = useFormContext();

  const [formState, setFormState] = useState({
    timebefore: 0,
    timeBeforeType: "minutes",
    ageRestriction: null,
    allowedAge: null,
    parkingOption: null,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: string, value: any) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
    setValue(field, value);
  };

  const handleSubmit = () => {
    console.log("Form State Before Submit:", formState);
    Object.entries(formState).forEach(([key, value]) => setValue(key, value));
    setUi((prev) => ({ ...prev, modal: false }));
  };

  const getButtonClasses = (isActive: boolean) =>
    `w-1/3 rounded border py-2 ${
      isActive
        ? "bg-blue-500 text-white"
        : "border-gray-300 bg-white dark:bg-black"
    }`;

  return (
    <section className="fixed left-1/2 top-1/2 w-[700px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg border bg-white px-5 py-8 dark:bg-black">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add highlights about your event</h1>
        <button
          className="px-4 py-2 text-sm font-semibold text-red-500 hover:underline"
          onClick={() => setUi((prev) => ({ ...prev, modal: false }))}
        >
          CLOSE
        </button>
      </div>

      <section className="mt-4 flex flex-col">
        <h2 className="text-lg font-semibold">
          What time can attendees check in before the event?
        </h2>
        <div className="flex items-center">
          <Input
            id="timebefore"
            type="number"
            defaultValue={formState.timebefore}
            {...register("timebefore", {
              valueAsNumber: true,
              onChange: (e) => handleFieldChange("timebefore", e.target.value),
            })}
          />
          {["minutes", "hours"].map((option) => (
            <button
              key={option}
              className={`ml-3 mt-[19px] w-[90px] border px-3 py-[5px] ${getButtonClasses(
                formState.timeBeforeType === option,
              )}`}
              onClick={() => handleFieldChange("timeBeforeType", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-2 text-lg font-bold">Is there an age restriction?</h3>
        <div className="flex space-x-4">
          {[
            "All ages allowed",
            "Theres an age restriction",
            "Parent or guardian needed",
          ].map((option) => (
            <button
              key={option}
              className={getButtonClasses(formState.ageRestriction === option)}
              onClick={() => handleFieldChange("ageRestriction", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {formState.ageRestriction === "Theres an age restriction" && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-bold">What ages are allowed?</h3>
          <div className="flex space-x-4">
            {[12, 13, 14, 15, 16, 17, 18, 19, 21].map((age) => (
              <button
                key={age}
                className={getButtonClasses(formState.allowedAge === age)}
                onClick={() => handleFieldChange("allowedAge", age)}
              >
                {age}+
              </button>
            ))}
          </div>
        </div>
      )}

      {formState.ageRestriction === "Parent or guardian needed" && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-bold">What ages are allowed?</h3>
          <div className="flex space-x-4">
            {[14, 16, 18, 21].map((age) => (
              <button
                key={age}
                className={getButtonClasses(formState.allowedAge === age)}
                onClick={() => handleFieldChange("allowedAge", age)}
              >
                Under {age}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="mt-6">
        <h3 className="mb-2 text-lg font-bold">
          Is there parking at your venue?
        </h3>
        <div className="flex space-x-4">
          {["Free parking", "Paid parking", "No parking options"].map(
            (option) => (
              <button
                key={option}
                className={getButtonClasses(formState.parkingOption === option)}
                onClick={() => handleFieldChange("parkingOption", option)}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </section>

      <div className="mt-7 flex justify-center">
        <Button className="w-1/4" onClick={handleSubmit}>
          Add to event
        </Button>
      </div>
    </section>
  );
};

export default CreateEventModal;
