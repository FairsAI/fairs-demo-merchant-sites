import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function QuickCheckoutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-12 rounded-none bg-black hover:bg-gray-900 text-white font-normal flex items-center justify-center mb-4">
          <span className="mr-2">Pay with</span>
          <Image src="/fairs-logo.svg" alt="Fairs" width={45} height={15} className="inline-block" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quick Checkout</DialogTitle>
          <DialogDescription>
            This feature is under development. Please use the standard checkout for now.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
