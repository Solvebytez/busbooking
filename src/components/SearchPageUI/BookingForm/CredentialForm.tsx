import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

  
const CredentialForm = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-xl">Login</CardTitle>
      <CardDescription>
        Click PROCEED TO Passenger detail when{" "}
        {"you're"} done.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-3 items-center justify-start gap-4">      
      <div className="space-y-1">
        {/* <Label className="font-semibold"  htmlFor="number">Enter Mobile Number</Label> */}
        <Input className="h-[3rem] border border-black font-bold" id="number" defaultValue="Enter Mobile Number" />
      </div>
      <div className="space-y-1">
        {/* <Label className="font-semibold"  htmlFor="email">Enter Email ID</Label> */}
        <Input className="h-[3rem] border border-black font-bold" id="email" defaultValue="Enter Email" />
      </div>
      <div className="flex items-center w-[100%]">
     <Button size={'lg'} className="text-xl capitalize m-auto block w-full h-[3rem]">Procced To passenger detail</Button>
     </div>
    </CardContent>
   
  </Card>
  )
}

export default CredentialForm