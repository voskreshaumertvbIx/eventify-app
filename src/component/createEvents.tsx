"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Event } from "../interfaces";
import UploadSection from "./create_events_form/uploadsection";
import TitleSection from "./create_events_form/titlesection";
import DateTimeSection from "./create_events_form/datetimesection";
import Goodtoknow from "./create_events_form/goodtoknow";
import { useUserStore } from "@/redux/store/userStore";
import { useEventStore } from "@/redux/store/eventStore";
import { useCreateEventMutation } from "@/redux/userApi/createeventsApi";
import { useLocationStore } from "@/redux/store/useLocationStore";


const CreateEvents = () => {
  const user = useUserStore((state) => state.user);
  const [createEvent] = useCreateEventMutation();
  const addEventToStore = useEventStore((state) => state.addEvent);

  const methods = useForm<Event>({
    defaultValues: {
      dateinfo: { date: new Date(), start: "", end: "" },
      title: "",
      description: "",
      image: { url: "", file: "" },
      createdby: user?.uid || "",
      createdImg: {
        file: user?.avatar?.file || "",
        url: user?.avatar?.url || "",
      },
      location: { lat: 0, lon: 0 },
      uid: "", 
    },
  });

  const submit = async (data: Event) => {
    if (!user) return;
  
    const { lat, lon } = useLocationStore.getState();
  
    const fullData = {
      ...data,
      createdby: user.uid || "Anonymous",
      location: {
        lat: lat || 0,
        lon: lon || 0,
      },
    };
  
    const response = await createEvent(fullData).unwrap();
    addEventToStore(response);
    console.log("Event created and saved:", response);
  };
  
  
  

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center">
        <form onSubmit={methods.handleSubmit(submit)}>
          <UploadSection />
          <TitleSection />
          <DateTimeSection />
          <Goodtoknow />
          <button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateEvents;
