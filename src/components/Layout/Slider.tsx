"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";


const listings = [
  {
    imageUrl:
      "https://busbooking.one67.in/public/frontend/images/slider_images/1715236592_sanchar6t1.jpg",
    status: "Sold",
    title: "Travel with Us for an Adventure-Filled Journey",
  },
  {
    imageUrl:
      "https://busbooking.one67.in/public/frontend/images/slider_images/1715236592_sanchar6t2.jpg",
    status: "Sold",
    title: "Travel with Us for an Adventure-Filled Journey",
  },
];

const SliderBanner = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("missingParams") === "true") {
      toast.error("Required Search fields are missing!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "white", color: "red" }, // Custom style
      });
    }
  }, [searchParams]);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="bg-white h-[calc(60vh)] overflow-hidden bannerSlide relative">
     <div className=" mx-auto w-full px-2.5 md:px-32 bg-primary/10 text-primary py-2">
     <div className="relative marquee-container d-none block">
        <div className="marquee flex justify-around">
          <span>
          Welcome to KSRTC AWATAR 4.0. Effective from 19-06-2024, KSRTC has launched New Mobile Application for the booking feature which is available at Play Store and App store. Please download the app for the enhanced booking experience
          </span>
        
        </div>
        <div className="marquee marquee2 flex justify-around">
        <span>
          Welcome to KSRTC AWATAR 4.0. Effective from 19-06-2024, KSRTC has launched New Mobile Application for the booking feature which is available at Play Store and App store. Please download the app for the enhanced booking experience
          </span>
        </div>
      </div>
     </div>
      <Slider {...settings} className="mt-0">
        {listings.map((item) => (
          <div
            key={item.title}
            className="h-[calc(60vh)] relative flex flex-col justify-center"
          >
            <Image
              alt={item.title}
              src={item.imageUrl}
              fill
              priority
              className="object-cover w-full h-[100%] absolute -z-10"
            />
            <div className="flex flex-col justify-center  relative  items-center w-full h-full opacity-100 z-40 font-bold text-4xl bg-black bg-opacity-20">
              <div className=" text-md px-10 py-2 text-white w-full h-[calc(60vh)] mt-[15rem] flex flex-col  text-center font-space">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
