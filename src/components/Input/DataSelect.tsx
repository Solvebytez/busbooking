"use client"

import * as React from "react"
import { format, addMonths, isBefore, startOfDay, addDays, isAfter, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { Input } from "@/components/ui/input"

interface DatePickerWithTwoMonthsProps {
  className?: string;
  disabled?: boolean;
  onChange: (date: Date | undefined) => void;
  value: Date|undefined;
  textLabel1?:string;
  textLabel2?:string;
  isError?:string
}


export default function DatePickerWithTwoMonths({textLabel1,textLabel2,className,disabled,onChange,value,isError}:DatePickerWithTwoMonthsProps) {
  const isValidDate = value ? isValid(new Date(value)) : true;

  const [date, setDate] = React.useState<Date|undefined>(isValidDate?value:undefined)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    console.log("Selected date:", selectedDate)   
    try {
      if (date && !isValid(date)) {
        throw new Error("Invalid date selected");
      }
      setDate(selectedDate)
      onChange(selectedDate)
      setIsOpen(false)
    } catch (error) {
      console.error("Date selection error:", error);
      // You could also show a toast message here
      onChange(undefined);
    }
  }

  const isDateInRange = (date: Date) => {
    const today = startOfDay(new Date())
    const thirtyDaysFromNow = startOfDay(addDays(today, 30))
    return !isBefore(date, today) && !isAfter(date, thirtyDaysFromNow)
  }


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
        disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal border-gray-600",
            !date && "text-muted-foreground", className,
            textLabel1 ==='Return Date'&& "text-red-600",
            isError && "text-red-600 border-red-600",
          )}
        >
          <CalendarIcon className="mr-2 h-6 w-6 text-primary" />
          <div className="flex flex-col gap-[2px] text-red-600">
          <span className={cn("text-gray-500 text-xs", isError && "text-red-600",)}>
         {textLabel1} {isError && "- Required*"}
        </span>
          {date ? format(date, "PPP") : <span className="font-bold">{textLabel2}</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <Calendar          
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={(date) => !isDateInRange(date)}
          />
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={date ? addMonths(date, 1) : addMonths(new Date(), 1)}
            disabled={(date) => !isDateInRange(date)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}