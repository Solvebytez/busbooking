import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AllSelectInput, { GenederPropsType } from "./AllSelectInput";
import { cn } from "@/lib/utils";

const genederDetails: GenederPropsType[] = [
  { name: "Male", label: "Male", value: "male" },
  { name: "Female", label: "Female", value: "female" },
  { name: "Others", label: "Others", value: "others" },
];

const concession: GenederPropsType[] = [
    { name: "General Public", label: "General Public", value: "General Public" },  
  ];

  const ID_card: GenederPropsType[] = [
    { name: "Passport", label: "Passport", value: "Passport" },  
  ];
  
  

const Passenger_DetailForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">As a Guest User Login</CardTitle>
        <CardDescription>
          Make changes to your account here. Click PROCEED TO Passenger detail
          when {"you're"} done.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-8 items-center justify-start gap-1">
      <div className="space-y-1">
          {/* <Label className="font-semibold"  htmlFor="number">Enter Mobile Number</Label> */}
          <button     
      disabled={true}    
      className={cn(
        "h-12 w-full rounded-sm transition-colors border-2 border-green-500", "bg-white cursor-not-allowed relative",     
        "flex items-center justify-center font-medium afterEffect"
      )}
    >
        13
    </button>
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold"  htmlFor="number">Enter Mobile Number</Label> */}
          <Input
            className="h-[3rem] border border-black font-bold"
            id="number"
            defaultValue="Enter Name"
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold" htmlFor="name">Select Country Code</Label> */}
          <AllSelectInput
            OnChange={() => {}}
            countryPhoneCodes={genederDetails}
            lebelText1="Select Gender"
            values=""
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold"  htmlFor="number">Enter Mobile Number</Label> */}
          <Input
            className="h-[3rem] border border-black font-bold"
            id="number"
            defaultValue="Age"
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold" htmlFor="name">Select Country Code</Label> */}
          <AllSelectInput
            OnChange={() => {}}
            countryPhoneCodes={concession}
            lebelText1="Concession"
            values=""
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold" htmlFor="name">Select Country Code</Label> */}
          <AllSelectInput
            OnChange={() => {}}
            countryPhoneCodes={ID_card}
            lebelText1="ID Card"
            values=""
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold"  htmlFor="email">Enter Email ID</Label> */}
          <Input
            className="h-[3rem] border border-black font-bold"
            id="email"
            defaultValue="ID Card No"
          />
        </div>
        <div className="space-y-1">
          {/* <Label className="font-semibold" htmlFor="name">Select Country Code</Label> */}
          <AllSelectInput
            OnChange={() => {}}
            countryPhoneCodes={genederDetails}
            lebelText1="India"
            values=""
            isDisabled={true}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center w-[100%]">
        <div className="flex items-center w-[100%]">
          <Button size={"lg"} className="text-xl capitalize m-auto">
            Procced To passenger detail
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Passenger_DetailForm;
