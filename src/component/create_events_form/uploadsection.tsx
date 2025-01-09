'use client'
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { RxUpload } from "react-icons/rx";
import { CldUploadWidget } from "next-cloudinary";

const UploadSection: React.FC = () => {
  const {  setValue } = useFormContext();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    const uploadedFile = result.info.public_id;
    setValue("image.url", uploadedUrl);
    setValue("image.file", uploadedFile);
    console.log("Uploaded image:", { url: uploadedUrl, file: uploadedFile });
  };

  return (
    <section className="relative h-[300px] w-[700px]">
      {!isUploadOpen ? (
        <>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            className="h-full"
          >
            {["/party1.jpg", "/party2.jpg", "/party3.jpeg"].map((src, index) => (
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
            ))}
          </Swiper>

          <div
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center text-sm"
            onClick={() => setIsUploadOpen(true)}
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
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">Add Images and Video</h1>
          <CldUploadWidget uploadPreset="zuytp4aj" onSuccess={handleImageUpload}>
            {({ open }) => (
              <button
                onClick={() => open()}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
          <button
            onClick={() => setIsUploadOpen(false)}
            className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
          >
            Go Back
          </button>
        </div>
      )}
    </section>
  );
};

export default UploadSection;
