import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Conatiner from "../Global/Conatiner";
import Link from "next/link";
import Image from "next/image";

// const navigation = [
//   { label: "Home", url: "/" },
//   { label: "About Us", url: "/about-us" },
//   { label: "Packages", url: "/packages" },
//   { label: "Ticket Search", url: "/ticket-search" },
//   { label: "Contact Us", url: "/contact-us" },
// ];

const column2=[
  { label: 'Operator/Agent Login', url: '/operator-login' },
  { label: 'Book a Bus', url: '/book-bus' },
  { label: 'Contact Us', url: '/contact-us' },
]

const column3 = [
  { label: 'About Us', url: '/about-us' },
  { label: 'Bus Services', url: '/bus-services' },
  { label: 'Key Statistics', url: '/key-statistics' },
  { label: 'Passenger Safety', url: '/passenger-safety' },
];

const column4 = [
  { label: 'Package Tour', url: '/package-tour' },
  { label: 'Hotel Booking', url: '/hotel-booking' },
  { label: 'Flight Booking', url: '/flight-booking' },
  { label: 'Membership', url: '/membership' },
];

// const socialMediaLinks = [
//   {
//     label: "YouTube",
//     imageUrl: "https://busbooking.one67.in/public/frontend/images/yt.svg",
//   },
//   {
//     label: "Facebook",
//     imageUrl: "https://busbooking.one67.in/public/frontend/images/fb.svg",
//   },
//   {
//     label: "LinkedIn",
//     imageUrl: "https://busbooking.one67.in/public/frontend/images/linkedin.svg",
//   },
//   {
//     label: "Instagram",
//     imageUrl: "https://busbooking.one67.in/public/frontend/images/insta.svg",
//   },
// ];

const Footer = () => {
  return (
    <div className="bg-secondary">
      <Conatiner>
        <div className="grid grid-cols-12 py-[5rem] text-white gap-2">
          <div className="col-span-3">
            <h2 className="font-bold text-xl mb-4">
              <Image alt="site logo" src='/logo.png' width={120} height={200} priority />
            </h2>
            <div className="space-y-3 text-md">
              {/* <p className="text-sm">
              Sanchar6t, under the leadership of proprietor Nagesh K N, is a distinguished service provider in the realms of bus booking and tourism, renowned for its specialization in Tirupati Balaji and special darshan packages.
              </p> */}
              <p className="flex gap-1 items-center text-primary-foreground/50">
                {" "}
                <Phone size={13} className="text-primary" /> +91 97313 12275
              </p>
              <p className="flex gap-1 items-center text-primary-foreground/50">
                {" "}
                <Mail size={13} className="text-primary" /> info@sanchar6t.com
              </p>
              <p className="flex gap-1 items-start text-primary-foreground/50 leading-4">
                {" "}
                <MapPin size={13} className="text-primary mt-1" /> No 93, 4th
                Main Mahadeshwarangar <br />
                Bangalore - 560091
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <h2 className="font-bold text-xl mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {column2.map((item, index) => (
                <li key={index} className="">
                  <Link
                    href={item.url}
                    className="text-primary-foreground/50 hover:text-primary-foreground flex gap-1 items-center"
                  >
                    {" "}
                    <ChevronRight size={15} className="text-primary" />{" "}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <h2 className="font-bold text-xl mb-4">Social Media Update</h2>
            <ul className="space-y-2">
              {column3.map((item, index) => (
                <li key={index} className="">
                  <Link
                    href={item.label}
                    className="text-primary-foreground/50 hover:text-primary-foreground flex gap-2 items-center"
                  >
                    {" "}<ChevronRight size={15} className="text-primary" />{" "}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <h2 className="font-bold text-xl mb-4">Social Media Update</h2>
            <ul className="space-y-2">
              {column4.map((item, index) => (
                <li key={index} className="">
                  <Link
                    href={item.label}
                    className="text-primary-foreground/50 hover:text-primary-foreground flex gap-2 items-center"
                  >                   
                    {" "}<ChevronRight size={15} className="text-primary" />{" "}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Conatiner>
      <footer className="bg-primary-foreground/15 text-gray-400 py-4">
        <Conatiner>
            <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span>© All rights reserved</span>
            <span className="text-red-500">|</span>
            <span>Engineered with Love</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
            <span className="text-red-500">|</span>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <span className="text-red-500">|</span>
            <a href="#" className="hover:text-white">
              Cancellation Refund
            </a>
          </div>
          </div>
        </Conatiner>
      </footer>
    </div>
  );
};

export default Footer;
