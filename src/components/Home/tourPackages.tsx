import Image from "next/image";
import React from "react";
import Conatiner from "../Global/Conatiner";
import LinkButton from "../Global/LinkButton";

const tourPackages = [
  {
    title: "Shirdi",
    description:
      "Shirdi, a small town in Maharashtra, India, is renowned for being the home of the revered spiritual leader Sai Baba. The town is a major pilgrimage destination, drawing devotees from around the world to the Sai Baba Temple.",
    imageUrl:
      "https://busbooking.one67.in/public/frontend/images/destination/tirumala.jpg",
  },
  {
    title: "Tirupati Balaji",
    description:
      "Tirupati, located in the Indian state of Andhra Pradesh, is a renowned pilgrimage destination famous for the sacred Sri Venkateswara Temple, often referred to as Tirumala Tirupati Devasthanams (TTD).",
    imageUrl:
      "https://busbooking.one67.in/public/frontend/images/destination/balaji.jpg",
  },
  {
    title: "Mysore",
    description:
      'Mysore, located in the southern Indian state of Karnataka, is a city renowned for its rich cultural heritage and historical significance. Often referred to as the "City of Palaces," Mysore is home to the magnificent Mysore Palace.',
    imageUrl:
      "https://busbooking.one67.in/public/frontend/images/destination/mysore.jpg",
  },
];

const TourPackages = () => {
  return (
    <Conatiner>
      <div className="mx-auto p-4">
        <h2 className="text-3xl mb-6 font-semibold">
          Popular <span className="text-red-500 font-bold">Bus Tickets</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourPackages.map((packageItem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="relative h-[17rem] w-[30rem] overflow-hidden group">
                <Image
                  fill
                  src={packageItem.imageUrl}
                  alt={packageItem.title}
                  className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {packageItem.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {packageItem.description}
                </p>
                <LinkButton               
                  href="#"
                  className="text-white bg-red-500  hover:bg-red-600 transition-colors duration-200"
                >
                  Tour Details <span aria-hidden="true">→</span>
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <a href="#all-packages" className="text-red-500 font-medium">
            View all Packages
          </a>
        </div>
      </div>
    </Conatiner>
  );
};

export default TourPackages;
