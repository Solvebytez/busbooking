'use client'

import {ThermometerSun , LampDesk,Wifi,NotebookPen ,BriefcaseMedical , LocateFixed , Hammer, Plug,Cctv , BlindsIcon as Blanket, AmbulanceIcon as FirstAid, DoorOpen,  SprayCanIcon as Spray, DropletIcon as Sanitizer, BedDouble, Usb } from 'lucide-react'

import { GiPillow } from "react-icons/gi";
import { LiaWineBottleSolid } from "react-icons/lia";
import { MdOutlineSanitizer } from "react-icons/md";
import { GiVomiting } from "react-icons/gi";
import { FaHeadSideMask } from "react-icons/fa";
import { CiMedicalMask } from "react-icons/ci";
type AmenitiesObjectType = { "amenity": string, "label": string }

const iconMap = {
  "Charging_Point": Plug,
  "Water_Bottle": LiaWineBottleSolid,
  "Blankets": Blanket,
  "First Aid Box": FirstAid,
  "Pillow": GiPillow,
  "Emergency Exit": DoorOpen,
  "Reading_Light": LampDesk,
  "Bus Sanitization": Sanitizer,
  "Fumigation": Spray,
  "BedSheet": BedDouble,
  "USB-Charger": Usb,
  "Emergency_exit": DoorOpen,
  "Hammer_(to_break_glass)": Hammer,
  "Live_Bus_Tracking":LocateFixed,
  "WiFi":Wifi,
  "CC_Camera": Cctv,
  "Welcome_Note":NotebookPen,
  "Hand_Sanitizer":MdOutlineSanitizer,
  "First_Aid_Box": BriefcaseMedical,
  "Vomiting_Bag": GiVomiting,
  "Driver/_Conductor_with_masks":FaHeadSideMask,
  "Thermal_Gun":ThermometerSun,
  "Mask":CiMedicalMask 
}

export default function Amenities({ amenitiesList }: { amenitiesList: AmenitiesObjectType[] }) {
  console.log("amenitiesList",amenitiesList)
  return (
    <div className=" p-6 rounded-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenitiesList.map((amenity, index) => {
          const IconComponent = iconMap[amenity.label as keyof typeof iconMap] || Plug // Default to Plug if no matching icon
          return (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <span className='w-[30px] h-[30px] rounded-full bg-primary/10 flex items-center justify-center'>
                <IconComponent className="w-5 h-5" />
              </span>
              <span className="text-sm">{amenity.amenity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

