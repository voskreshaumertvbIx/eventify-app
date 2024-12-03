"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./reusable/Input";
import { Event } from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { RxUpload } from "react-icons/rx";

const CreateEvents = () => {
  const [value, setValue] = useState("");
  const maxLength = 140;
  const [openModal, setOpenModal] = useState({
    title: false,
    image: false,
  });
  const { register, handleSubmit, formState } = useForm<Event>({
    defaultValues: {
      title: "",
    },
  });

  const submit = (data: Event) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center">
      <form action="" onSubmit={handleSubmit(submit)}>
        <section className="relative h-[300px] w-[700px]">
          {openModal.image === false && (
            <>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="h-full"
              >
                {["/party1.jpg", "/party2.jpg", "/party3.jpeg"].map(
                  (src, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="h-full w-full overflow-hidden rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${src})`,
                        }}
                      >
                        <div className="absolute inset-0 rounded-lg bg-white bg-opacity-60"></div>
                      </div>
                    </SwiperSlide>
                  ),
                )}
              </Swiper>

              <div className="absolute inset-0 z-10 flex items-center justify-center text-sm">
                <div className="w-[120px] rounded-lg bg-white p-4 text-center shadow-lg">
                  <RxUpload className="m-auto mb-2 h-5 w-5 text-blue-500" />
                  <p className="text-[12px] font-medium text-blue-500">
                    Upload photos and video
                  </p>
                </div>
              </div>
            </>
          )}
        </section>

        <section
          onClick={() => setOpenModal((prev) => ({ ...prev, title: true }))}
          className="mt-12 w-[700px] rounded-lg border p-4"
        >
          {openModal.title === false && (
            <div>
              <h1 className="text-6xl font-medium">Event title</h1>
              <p className="my-3">
                A short and sweet sentence about your event
              </p>
            </div>
          )}
          {openModal.title === true && (
            <div>
              <div>
                <h1 className="text-2xl font-medium">Event Overview</h1>
                <p className="my-2">
                  Be clear and descriptive with a title that tells people what
                  your event is about.
                </p>
                <Input
                  type="text"
                  placeholder="Event title*"
                  error={formState.errors["title"]?.message}
                  {...register("title", { required: true, maxLength: 20 })}
                />
              </div>
              <div>
                <h1>Summary</h1>
                <p>
                  Grab people&apos;s attention with a short description about
                  your event. Attendees will see this at the top of your event
                  page. (140 characters max)
                </p>
                <textarea
                  id="summary"
                  maxLength={maxLength}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="block w-full border bg-white p-0 text-gray-900 dark:bg-black dark:text-white"
                  placeholder="Enter a summary..."
                />
                <p className="text-right">
                  {value.length} / {maxLength}
                </p>
              </div>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default CreateEvents;
