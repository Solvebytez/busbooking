import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ScreenShare } from "lucide-react"
  

const BusInfoModal = () => {
  return (
    <Dialog>
  <DialogTrigger><ScreenShare size={20} /></DialogTrigger>
  <DialogContent className="md:max-w-[800px]">
    <DialogHeader>
      <DialogTitle className="text-xl mb-2">Service Route Details - 0455CKSBLJ</DialogTitle>
      <DialogDescription>
      <div className="md:max-w-[800px] mx-auto">
      <div className="bg-[#FF9B5B] text-white p-4">
        <h1 className="text-lg">Bus Type: KARNATAKA SARIGE</h1>
      </div>
      
      <div className="divide-y">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">CHIKKALSANDRA BENGALURU</h2>
              <p className="text-gray-600 text-sm">NAIDU LAYOUT</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>04:55, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">CHIKKALSANDRA BENGALURU</h2>
              <p className="text-gray-600 text-sm">CHIKKALSANDRA BENGALURU</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>05:00, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">CHIKKALSANDRA BENGALURU</h2>
              <p className="text-gray-600 text-sm">PADMANABHANAGAR 12B BUSSTOP 9739005008</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>05:05, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">CHIKKALSANDRA BENGALURU</h2>
              <p className="text-gray-600 text-sm">KATHRIGUPPE NEAR BIGBAZAR</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>05:10, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">CHIKKALSANDRA BENGALURU</h2>
              <p className="text-gray-600 text-sm">VIDYAPEETA CIRLE</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>05:15, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">BENGALURU</h2>
              <p className="text-gray-600 text-sm">ITI MAINGATE BMTC BS PH NO. 7760990956</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>05:55, Sat 14 Dec</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg text-black">BENGALURU</h2>
              <p className="text-gray-600 text-sm">BENGALURU</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-4 h-4 flex items-center">⏱</span>
              <span>06:00, Sat 14 Dec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default BusInfoModal