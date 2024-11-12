import { cn } from "@/lib/utils";
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react";

type buttonProps = {
    btnText: string;
    isDisabled?: boolean;
    isPending?: boolean;
    onClick?: () => void;
    className?: string;
}
const SubmitButton = ({btnText,className,isDisabled,isPending,onClick}:buttonProps) => {
  return (
    <Button onClick={()=>onClick} variant="default" size="lg" className={cn("bg-primary", className)} disabled={isPending||isDisabled}>
        {isPending? <LoaderCircle size={18} className="text-white animate-spin" />:btnText }
        </Button>
  )
}

export default SubmitButton