import { Mail, Phone } from "lucide-react";
import Conatiner from "../Global/Conatiner";
import { cn } from "@/lib/utils";

const InfoBar = () => {
  return (
    <div className={cn("hidden sm:flex py-3 bg-primary text-primary-foreground",)}>
      <Conatiner>
        <div className="container mx-auto flex justify-end flex-wrap text-xs font-semibold">
          <div className="flex items-center">
            <p className="flex gap-1"> <Phone size={15} /> +91-8197882511</p>
            &nbsp; &nbsp;
            <p className="flex gap-1"> <Mail size={15} /> info@sanchar6t.com</p>
          </div>
        </div>
      </Conatiner>
    </div>
  );
};

export default InfoBar;
