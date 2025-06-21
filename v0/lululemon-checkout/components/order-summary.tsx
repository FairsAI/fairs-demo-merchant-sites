"use client"

import Image from "next/image"
import { Gift, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSummary() {
  return (
    <div className="border border-gray-200 rounded-md p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="flex items-start mb-6">
        <Gift className="mr-3 mt-1 flex-shrink-0" size={18} />
        <p className="text-sm">If you have a gift card, use it at checkout.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$156.00</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-1">Shipping</span>
            <Info size={14} className="text-gray-500" />
          </div>
          <span className="font-medium">FREE</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-1">Tax</span>
            <Info size={14} className="text-gray-500" />
          </div>
          <span>Calculated at checkout</span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
          <span>Estimated Total</span>
          <span>USD $156.00</span>
        </div>
      </div>

      <div className="mb-6 text-sm text-center">
        <p className="mb-2">or 4 payments of $39.00 with</p>
        <div className="flex justify-center items-center space-x-2">
          <span className="font-bold">Afterpay</span>
          <span>or</span>
          <span className="font-bold">Klarna</span>
          <Info size={14} className="text-gray-500 ml-1" />
        </div>
      </div>

      <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-4">
        <span className="transform scale-80" style={{ transform: "scale(0.8)" }}>
          CHECKOUT
        </span>
      </Button>

      <div className="text-center mb-4">
        <p className="text-sm mb-2">or checkout quickly with</p>
        <button className="w-full bg-black text-white py-3 px-4 rounded flex items-center justify-center">
          <div className="h-4 w-16 relative">
            <Image src="/fairs-logo.svg" alt="FAIRS" fill className="object-contain" />
          </div>
        </button>
      </div>
    </div>
  )
}
