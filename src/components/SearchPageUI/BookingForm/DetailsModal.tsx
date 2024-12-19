"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormValues } from "./Passenger_Detail"

interface DetailsModalProps {
  showDetailsModal: boolean
  onClose: () => void;
  submitOnCheckout: (data: FormValues) => void;
  formData: FormValues; // Add this line
}

export function DetailsModal({ showDetailsModal, onClose, submitOnCheckout,formData}: DetailsModalProps) {

  
    if (!showDetailsModal) return null;
  return (
    <Dialog open={showDetailsModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Review Your Detail Before Procced</DialogTitle>
          <DialogDescription>
            Click procced to checkout when {"you're"} done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
        <Button onClick={() => submitOnCheckout(formData)}>Proceed to Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

