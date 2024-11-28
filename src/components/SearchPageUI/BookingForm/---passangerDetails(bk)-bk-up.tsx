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
import { cn, SeatData } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { GstPropsType } from "./BookingForm";
import { useRouter } from "next/navigation";

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

const Passenger_DetailForm = ({ selectedSeats, scheduleId,getSeatCost }: { selectedSeats: SeatData[], scheduleId: string; getSeatCost:GstPropsType[] }) => {

  const router = useRouter();
  
  const [formData, setFormData] = useState(
    selectedSeats.map((seat) => ({
      seat: seat.seat,
      name: "",
      gender: "",
      age: "",
      concession: "",
      idCard: "",
      idCardNo: "",
      country: "India",
      scheduleId:scheduleId
    }))
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [field]: value };
      return updatedData;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();
    localStorage.removeItem("passengerDetails");
 
   const invalidFields = formData.filter(
    ({ name, gender, age, concession, idCard, idCardNo }) =>
      !name.trim() || !gender || !age.trim() || !concession || !idCard || !idCardNo.trim()
  );

console.log("invalidFields",invalidFields);
  return;

  if (invalidFields.length > 0) {
    // Show error toast if there are missing fields
    toast.error("Please fill in all the required fields.");
  } else {
    // Form is valid, you can submit the data or perform actions as needed
    const storedData = formData.map((data) => ({
      data:{...data},
      scheduleId,  // Add scheduleId to each entry
      getSeats:{...getSeatCost}
    }));



    localStorage.setItem("passengerDetails", JSON.stringify(storedData));


    
    toast.success("Form submitted successfully!");

   
    router.push('/booking-details');
    // Handle form submission (e.g., send data to the server)
  }
    // Submit the form data to the server or handle it as needed
  };
  console.log("selectedSeats:......", selectedSeats);
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl">As a Guest User Login</CardTitle>
          <CardDescription>
            Make changes to your account here. Click PROCEED TO Passenger detail
            when {"you're"} done.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-start gap-0">
          {selectedSeats.length > 0 &&
            selectedSeats.map((item, index) => (
              <div key={item.seat} className="grid grid-cols-8 items-center justify-start gap-1 w-full space-y-2">
                <div className="space-y-1">
                  <input type="hidden" name="scheduleId" value={scheduleId}/>
                  <button
                    disabled={true}
                    className={cn(
                      "h-12 w-full rounded-sm transition-colors border-2 border-green-500",
                      "bg-white cursor-not-allowed relative",
                      "flex items-center justify-center font-medium afterEffect"
                    )}
                  >
                    {item.seat}
                  </button>
                </div>
                <div className="space-y-1">
                  <Input
                    className="h-[3rem] border border-black font-bold"
                    id={`name-${index}`}
                    value={formData[index].name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <AllSelectInput
                    OnChange={(value) => handleInputChange(index, "gender", value)}
                    countryPhoneCodes={genederDetails}
                    lebelText1="Select Gender"
                    values={formData[index].gender}
                    isError={formData[index].gender}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    className="h-[3rem] border border-black font-bold"
                    id={`age-${index}`}
                    value={formData[index].age}
                    onChange={(e) => handleInputChange(index, "age", e.target.value)}
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <AllSelectInput
                    OnChange={(value) => handleInputChange(index, "concession", value)}
                    countryPhoneCodes={concession}
                    lebelText1="Concession"
                    values={formData[index].concession}
                    isError={formData[index].concession}
                  />
                </div>
                <div className="space-y-1">
                  <AllSelectInput
                    OnChange={(value) => handleInputChange(index, "idCard", value)}
                    countryPhoneCodes={ID_card}
                    lebelText1="ID Card"
                    values={formData[index].idCard}
                    isError={formData[index].idCard}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    className="h-[3rem] border border-black font-bold"
                    id={`idCardNo-${index}`}
                    value={formData[index].idCardNo}
                    onChange={(e) => handleInputChange(index, "idCardNo", e.target.value)}
                    placeholder="ID Card No"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <AllSelectInput
                    OnChange={(value) => handleInputChange(index, "country", value)}
                    countryPhoneCodes={genederDetails}
                    lebelText1="India"
                    values={formData[index].country}
                    isDisabled={true}
                   
                  />
                </div>
              </div>
            ))}
        </CardContent>
        <CardFooter className="flex items-center w-[100%]">
          <div className="flex items-center w-[100%]">
            <Button type="submit" size={"lg"} className="text-xl capitalize m-auto">
              Proceed To passenger detail
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Passenger_DetailForm;
