'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,        
      };
      return (
        <div className="bg-white h-[calc(60vh)] overflow-hidden bannerSlide">
        <Slider {...settings}>
          {listings.map((item) => (
            <div key={item.title} className="h-[calc(60vh)] relative flex flex-col justify-center">
              <Image
                alt={item.title}
                src={item.imageUrl}
                fill
                priority
                className="object-cover w-full h-[100%] absolute -z-10"
              />
              <div className="flex flex-col justify-center  relative  items-center w-full h-full opacity-100 z-40 font-bold text-4xl bg-black bg-opacity-20">
                <div className=" text-md px-10 py-2 text-white w-full h-[calc(60vh)] mt-[15rem] flex flex-col  text-center font-space">{item.title}</div>
               
               
              </div>
            </div>
          ))}
        </Slider>
      </div>
      );
}

export default SliderBanner