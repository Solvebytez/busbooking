import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const carouselItems = [
    {
      id: 1,    
      type: "Image",
      src: "https://crs-cargo-proof.s3-ap-southeast-1.amazonaws.com/bkg_del_2_1717909567280.JPG",
      alt: ""
    },
    {
      id: 2,
      type: "img",
      src: "https://crs-cargo-proof.s3-ap-southeast-1.amazonaws.com/bkg_del_0_1717909613398.JPG"
    },
    {
      id: 3,
      type: "img",
      src: "https://crs-cargo-proof.s3-ap-southeast-1.amazonaws.com/bkg_del_0_1717909549044.JPG"
    },
    {
      id: 4,
      type: "img",
      src: "https://crs-cargo-proof.s3-ap-southeast-1.amazonaws.com/bkg_del_2_1717909567280.JPG"
    }
  ];

function BusSlider() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return (
    <div className="slider-container w-[70%] h-[29rem] m-auto">
      <Slider {...settings}>
      {carouselItems.map(item => (
        <div key={item.id} className="w-full h-[29rem]">
          <Image alt={item.type} src={item.src} fill className="object-cover" />
        </div>
      ))}
      </Slider>
    </div>
  );
}

export default BusSlider;
