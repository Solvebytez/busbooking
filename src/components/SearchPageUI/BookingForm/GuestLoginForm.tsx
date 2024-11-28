// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"

// import CountryCodeSelect, { CountryPropsType } from "./CountryCodeSelect";

// const countryPhoneCodes:CountryPropsType[] = [
//     { country: 'United States', code: '+1', label: 'United States (+1)' },
//     { country: 'Canada', code: '+1', label: 'Canada (+1)' },
//     { country: 'United Kingdom', code: '+44', label: 'United Kingdom (+44)' },
//     { country: 'Australia', code: '+61', label: 'Australia (+61)' },
//     { country: 'India', code: '+91', label: 'India (+91)' },
//     { country: 'Germany', code: '+49', label: 'Germany (+49)' },
//     { country: 'France', code: '+33', label: 'France (+33)' },
//     { country: 'Japan', code: '+81', label: 'Japan (+81)' },
//     { country: 'China', code: '+86', label: 'China (+86)' },
//     { country: 'Brazil', code: '+55', label: 'Brazil (+55)' },
//     { country: 'South Africa', code: '+27', label: 'South Africa (+27)' },
//     { country: 'Mexico', code: '+52', label: 'Mexico (+52)' },
//     { country: 'Italy', code: '+39', label: 'Italy (+39)' },
//     { country: 'Spain', code: '+34', label: 'Spain (+34)' },
//     { country: 'Netherlands', code: '+31', label: 'Netherlands (+31)' },
//     { country: 'Sweden', code: '+46', label: 'Sweden (+46)' },
//     { country: 'Norway', code: '+47', label: 'Norway (+47)' },
//     { country: 'Denmark', code: '+45', label: 'Denmark (+45)' },
//     { country: 'Switzerland', code: '+41', label: 'Switzerland (+41)' },
//     { country: 'Russia', code: '+7', label: 'Russia (+7)' },
//     { country: 'South Korea', code: '+82', label: 'South Korea (+82)' },
//     { country: 'Argentina', code: '+54', label: 'Argentina (+54)' },
//     { country: 'Indonesia', code: '+62', label: 'Indonesia (+62)' },
//     { country: 'Saudi Arabia', code: '+966', label: 'Saudi Arabia (+966)' },
//     { country: 'United Arab Emirates', code: '+971', label: 'United Arab Emirates (+971)' },
//     { country: 'Turkey', code: '+90', label: 'Turkey (+90)' },
//     { country: 'New Zealand', code: '+64', label: 'New Zealand (+64)' },
//     { country: 'Singapore', code: '+65', label: 'Singapore (+65)' },
//     { country: 'Malaysia', code: '+60', label: 'Malaysia (+60)' },
//     { country: 'Philippines', code: '+63', label: 'Philippines (+63)' }
//   ];
  

  

const GuestLoginForm = ({onSuccsecchLogin}:{onSuccsecchLogin:(val:boolean)=>void}) => {


  

  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-xl">As a Guest User Login</CardTitle>
      <CardDescription>
        Make changes to your account here. Click PROCEED TO Passenger detail when{" "}
        {"you're"} done.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-3 items-center justify-start gap-4">
      {/* <div className="space-y-1">
       
        <CountryCodeSelect OnChange={()=>{}} countryPhoneCodes={countryPhoneCodes} lebelText1="Select Country Code" values=""/>
      </div>
      <div className="space-y-1">
       
        <Input className="h-[3rem] border border-black font-bold" id="number" defaultValue="Enter Mobile Number" />
      </div>
      <div className="space-y-1">
     
        <Input className="h-[3rem] border border-black font-bold" id="email" defaultValue="Enter Email" />
      </div> */}
    </CardContent>
    <CardFooter className="flex items-center w-[100%]">
     <div className="flex items-center w-[100%]">
     <button onClick={()=>onSuccsecchLogin(true)} type="button" className="text-xl capitalize m-auto">Proceed To passenger detail
     
     </button>
     </div>
    </CardFooter>
  </Card>
  )
}

export default GuestLoginForm