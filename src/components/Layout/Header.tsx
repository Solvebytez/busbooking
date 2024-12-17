"use client";
import { useEffect, useState } from "react";
import Conatiner from "../Global/Conatiner";
import Image from "next/image";
import Link from "next/link";
import InfoBar from "./InfoBar";
import { UsersRound } from "lucide-react";
import { House } from 'lucide-react';
import { cn } from "@/lib/utils";


const navigation = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about" },
    { label: "Packages", url: "/packages" },
    { label: "Ticket Search", url: "/ticket-search" },
    { label: "Contact Us", url: "/contact-us" }
  ];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);   
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header  className={cn("fixed top-0 left-0 z-20 w-full duration-300 ease-in-out",isSticky?"-translate-y-11":"translate-y-0")}>
        <InfoBar />
      <nav className={cn("flex flex-wrap items-center justify-between w-full bg-white/50 backdrop-blur-lg py-3 border-b border-gray-200",)}>
        <Conatiner className="">
          <div className="flex flex-wrap items-center justify-between w-full">
            <div>
              <Link href="/"> <Image
              className="dark:invert"
              src="/logo.svg"
              alt="Vercel logomark"
              width={270}
              height={20}
            /></Link>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="menu-button"
              className="h-6 w-6 cursor-pointer md:hidden block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleMenu}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <div
              className={`md:flex md:items-center md:w-auto top-[3rem] duration-500 ease-linear md:top-0 ${
                menuOpen
                  ? "block absolute w-full left-0  pl-5 translate-x-[0] opacity-100"
                  : "max-md:absolute max-md:-translate-x-[140%] max-md:opacity-0"
              }`}
              id="menu"
            >
              <ul className="pt-4 text-base text-foreground md:flex md:justify-between items-center md:pt-0">
                {
                    navigation.map((item) => (
                      <li key={item.label}>
                        <Link
                          className={cn(' px-4 text-sm text-gray-800 block hover:text-muted-foreground', item.label==='Home'?'bg-primary/10 py-3 rounded-sm text-primary':'' )}
                          href={item.url}
                        >
                            {item.label==='Home'?  <House size={14} /> :  item.label }
                         
                        </Link>
                      </li>
                    ))
  
                }               
                <li>
                  <Link
                    className=" px-4 py-[7px] hover:text-muted-foreground bg-secondary text-white text-sm font-bold rounded flex gap-1 items-center justify-center "
                    href="#"
                  >
                    <UsersRound size={14} /> Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Conatiner>
      </nav>
    </header>
  );
};

export default Header;
