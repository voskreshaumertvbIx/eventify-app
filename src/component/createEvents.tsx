"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./reusable/Input";
import { Event } from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { RxUpload } from "react-icons/rx";
import { useLocationStore } from "@/redux/store/useLocationStore";
import MapWithSearch from "./MapWithSearch";
import { CldUploadWidget } from "next-cloudinary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  filterAvailableEndTimes,
  generateAvailableTimes,
} from "@/utils/timeUtils";
import TimePicker from "./reusable/TimePicker";

const CreateEvents = () => {
  const [event, setAvatar] = useState({
    url: "",
    file: "",
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const { lat, lon } = useLocationStore();
  const [value, setValue] = useState("");
  const maxLength = 140;
  const [openModal, setOpenModal] = useState({
    title: false,
    image: false,
  });

  useEffect(() => {
    setAvailableTimes(generateAvailableTimes());
  }, []);

  const { register, handleSubmit, formState, control } = useForm<Event>({
    defaultValues: {
      dateinfo: { date: new Date(), end: "", start: "" },
      title: "",
      description: "",
      image: {
        file: "",
        url: "",
      },
    },
  });

  const submit = (data: Event) => {
    const newData = {
      ...data,
      location: {
        lat: lat,
        lon: lon,
      },
      image: {
        url: event.url,
        file: event.url,
      },
    };
    console.log(newData);
    console.log(lat, lon);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    const uploadedFile = result.info.public_id;

    setAvatar({ url: uploadedUrl, file: uploadedFile });
    console.log("Uploaded image:", { url: uploadedUrl, file: uploadedFile });
  };
  return (
    <div className="flex flex-col items-center">
      <form action="" onSubmit={handleSubmit(submit)}>
        <section
          className={`relative h-[300px] w-[700px] ${openModal.image === false ? "" : "rounded-lg border-[1px] border-blue-700"}`}
        >
          {openModal.image === false ? (
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

              <div
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center text-sm"
                onClick={() =>
                  setOpenModal((prev) => ({ ...prev, image: true }))
                }
              >
                <div className="w-[120px] rounded-lg bg-white p-4 text-center shadow-lg">
                  <RxUpload className="m-auto mb-2 h-5 w-5 text-blue-500" />
                  <p className="text-[12px] font-medium text-blue-500">
                    Upload photos and video
                  </p>
                </div>
              </div>
            </>
          ) : (
            <section className="p-4">
              <h1 className="mb-4 text-2xl font-bold">Add images and video</h1>
              <p className="text-lg font-semibold">Images</p>
              <CldUploadWidget
                uploadPreset="zuytp4aj"
                onSuccess={handleImageUpload}
              >
                {({ open }) => (
                  <button onClick={() => open()} className="mt-4">
                    Upload an Image
                  </button>
                )}
              </CldUploadWidget>
            </section>
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
                  maxLength={maxLength}
                  {...register("description", {
                    required: "Description is required",
                  })}
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
        <div className="">
          <label htmlFor="date" className="mb-1 block">
            Date
          </label>
          <Controller
            {...register("dateinfo.date", { required: true })}
            control={control}
            rules={{ required: "this field required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                className="main-input"
                calendarClassName="custom-calendar"
                placeholderText="select-date"
              />
            )}
          />
          <div>
            <TimePicker
              label="Start Time"
              name="dateinfo.start"
              control={control}
              availableTimes={availableTimes}
              rules={{ required: "Start time is required" }}
              onChangeCallback={(value) => setStartTime(value)}
              className="mb-4"
            />
          </div>

          <div>
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
              className="mb-4"
            />
          </div>
        </div>
        <MapWithSearch />
        <button type="submit"> rererererer</button>
      </form>
    </div>
  );
};

export default CreateEvents;
