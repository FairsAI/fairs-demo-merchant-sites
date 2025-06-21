"use client"

import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CartItemProps {
  item: {
    id: number
    name: string
    color: string
    size: string
    price: number
    quantity: number
    image: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-32 mb-4 sm:mb-0">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} width={120} height={150} className="rounded" />
        </div>

        <div className="flex-1 pl-6 sm:pl-8">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-[80%]">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-gray-600 mb-1">{item.color}</p>
              <p className="text-gray-600 mb-2">Size {item.size}</p>
              <button className="text-gray-600 underline text-sm mb-4">Edit</button>
              <p className="text-sm">Free Shipping + Free Returns</p>
            </div>

            <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
              <div className="flex items-center justify-between sm:justify-end w-full mb-4">
                <div className="sm:mr-8 sm:order-2">
                  <p className="text-gray-600 mb-1">Item Price</p>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>

                <div className="sm:mr-8 sm:order-1">
                  <p className="text-gray-600 mb-1">Quantity</p>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden sm:block sm:order-3">
                  <p className="text-gray-600 mb-1">Item Price</p>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex space-x-4 mt-auto">
                <button className="text-sm underline">Save for Later</button>
                <button className="text-sm underline">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
