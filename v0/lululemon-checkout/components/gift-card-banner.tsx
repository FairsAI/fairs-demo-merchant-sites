"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function GiftCardBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-white text-black text-center py-2 px-4 relative text-sm border-b border-gray-200">
      <span>
        Your gift card called—it wants you to use it. Don&apos;t know where to start?{" "}
        <a href="#" className="underline font-medium">
          Shop Bestsellers
        </a>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  )
}
