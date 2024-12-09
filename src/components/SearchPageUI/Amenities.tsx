// import { Plug, BoxIcon as Bottle, BlindsIcon as Blanket, AmbulanceIcon as FirstAid, PillIcon as Pillow, DoorOpen, Lamp, SprayCanIcon as Spray, DropletIcon as Sanitizer, BedDouble, Usb } from 'lucide-react'


type AmenitiesObjectType={ "amenity": string, "label": string }

export default function Amenities({amenitiesList}:{amenitiesList:AmenitiesObjectType[]}) {
  // const amenities = [
  //   { icon: <Plug className="w-5 h-5" />, label: "Charging Point" },
  //   { icon: <Bottle className="w-5 h-5" />, label: "Water Bottle Holder" },
  //   { icon: <Blanket className="w-5 h-5" />, label: "Blanket" },
  //   { icon: <FirstAid className="w-5 h-5" />, label: "First Aid Box" },
  //   { icon: <Pillow className="w-5 h-5" />, label: "Pillow" },
  //   { icon: <DoorOpen className="w-5 h-5" />, label: "Emergency Exit" },
  //   { icon: <Lamp className="w-5 h-5" />, label: "Reading Light" },
  //   { icon: <Sanitizer className="w-5 h-5" />, label: "Bus Sanitization" },
  //   { icon: <Spray className="w-5 h-5" />, label: "Fumigation" },
  //   { icon: <BedDouble className="w-5 h-5" />, label: "BedSheet" },
  //   { icon: <Usb className="w-5 h-5" />, label: "USB-Charger" },
  // ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenitiesList.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-700">
            {/* <span className='w-[30px] h-[30px] rounded-full bg-primary/10 flex items-center justify-center'>{amenity.icon}</span> */}
            <span className="text-sm">{amenity.amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}