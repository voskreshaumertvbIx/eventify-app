'use client'
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../reusable/Input";


const TitleSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const maxLength = 140;
  const[value, setValue] = useState("");
  const { register, formState } = useFormContext();

  return (
    
    <section
      onClick={() => setIsEditing(true)}
      className="mt-12 w-[700px] rounded-lg border p-4 mb-12"
    >
      {!isEditing ? (
        <div>
          <h1 className="text-6xl font-medium">Event title</h1>
          <p className="my-3">A short and sweet sentence about your event</p>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl font-medium">Event Overview</h1>
            <p className="my-2">
              Be clear and descriptive with a title that tells people what your
              event is about.
            </p>
            <Input
              type="text"
              placeholder="Event title*"
              error={formState.errors["title"]?.message?.toString()}
              {...register("title", { required: "Title is required" })}
            />
          </div>
          <div>
            <h1>Summary</h1>
            <p>
              Grab people&apos;s attention with a short description about your
              event. Attendees will see this at the top of your event page. (140
              characters max)
            </p>
            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: maxLength,
                  message: `Description cannot exceed ${maxLength} characters`,
                },
              })}
              maxLength={maxLength}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="block w-full border bg-white p-2 text-gray-900"
              placeholder="Enter a summary..."
            />
            <p>{value.length} / {maxLength}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TitleSection;
