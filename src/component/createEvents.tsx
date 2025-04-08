  'use client'
  import React from "react";
  import { useForm, FormProvider } from "react-hook-form";

  import { Event } from "../interfaces";
  import UploadSection from "./create_events_form/uploadsection";
  import TitleSection from "./create_events_form/titlesection";
  import DateTimeSection from "./create_events_form/datetimesection";
  import Goodtoknow from "./create_events_form/goodtoknow";
import { useUserStore } from "@/redux/store/userStore";






  const CreateEvents = () => {
    
      const user = useUserStore((state) => state.user);
    
    const methods = useForm<Event>({
      defaultValues: {
        dateinfo: { date: new Date(), start: "", end: "" },
        title: "",
        description: "",
        image: { url: "", file: "" },
        createdby: user?.name,
        createdImg:{
          file:user?.avatar?.file,
          url: user?.avatar?.url,
        } 
      },
    });

    const submit = (data: Event) => {
      console.log("Form Data:", data);
    };

    return (
      <FormProvider {...methods}>
        <div className="flex flex-col items-center">
          <form onSubmit={methods.handleSubmit(submit)}>
          
            <UploadSection />
            <TitleSection />
            <DateTimeSection />
            <Goodtoknow/>
            <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
              Submit
            </button>
          </form>
        </div>
      </FormProvider>
    );
  };

  export default CreateEvents;
