"use client"

import { useState } from "react"
import { ChevronDown, Info, MoreVertical } from "lucide-react"
import Image from "next/image"

export default function GlossierCheckout() {
  const [isShipSelected, setIsShipSelected] = useState(true)
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(true)
  const [isGiftMessageChecked, setIsGiftMessageChecked] = useState(false)
  const [isPinkPouchChecked, setIsPinkPouchChecked] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-apercu-regular">
      {/* Left Column - Checkout Information */}
      <div className="flex-1 p-6 lg:p-10 lg:max-w-[600px]">
        <div className="mb-16">
          <Image src="/images/glossier-logo.png" alt="Glossier" width={120} height={40} className="object-contain" />
        </div>

        {/* Fairs Logo (replacing ShopPay button) */}
        <div className="mt-4 mb-2">
          <svg viewBox="0 0 119.52 39.42" className="w-16 h-auto">
            <path className="cls-1" d="M10.8,28.68v9.84H0V2.52H27.48V12.42H10.8v7.02h15.48v9.24H10.8Z" fill="#221f20" />
            <path
              className="cls-1"
              d="M46.26,31.68h-.9c-1.38,4.44-4.08,7.44-8.82,7.44-4.38,0-8.1-2.52-8.1-8.28,0-5.1,3-8.52,10.92-8.52h6.36v-1.98c0-2.1-1.02-3.36-3.18-3.36-1.92,0-3.06,.96-3.42,3.06l-9.54-2.1c.84-4.98,4.74-8.94,13.38-8.94,9.24,0,12.9,4.14,12.9,11.4v18.12h-9.6v-6.84Zm-.54-4.44v-1.08h-4.2c-1.98,0-3.48,1.08-3.48,2.7s.84,2.64,3.3,2.64c2.7,0,4.38-1.8,4.38-4.26Z"
              fill="#221f20"
            />
            <path className="cls-1" d="M59.34,6.78V0h10.2V6.78h-10.2Zm0,31.74V9.84h10.2v28.68h-10.2Z" fill="#221f20" />
            <path
              className="cls-1"
              d="M73.02,38.52V9.84h9.6v10.08h.84c2.1-9.24,4.14-10.38,7.44-10.38h.72v11.76h-1.92c-5.46,0-6.48,1.14-6.48,5.34v11.88h-10.2Z"
              fill="#221f20"
            />
            <path
              className="cls-1"
              d="M92.94,30.6l9.06-1.86c.66,2.76,2.4,3.72,4.8,3.72,1.92,0,2.88-.54,2.94-1.8,0-1.14-.66-1.92-5.46-3-8.1-1.92-10.74-4.44-10.74-9.6,0-5.88,4.14-9.12,12.78-9.12s11.64,3.3,12.54,8.22l-9,1.86c-.42-2.28-1.32-3.3-3.78-3.3-1.98,0-2.94,.6-2.94,1.74,0,1.08,.36,1.98,5.16,3.06,9.42,2.1,11.22,5.28,11.22,9.66,0,5.88-3.9,9.24-12.96,9.24-10.26,0-13.02-3.96-13.62-8.82Z"
              fill="#221f20"
            />
          </svg>
        </div>

        {/* Customer Email */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <span className="text-sm">tindale.david@gmail.com</span>
          <button>
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-3">Delivery</h2>
          <div className="space-y-3">
            <label className="flex items-center bg-gray-100 p-3 rounded-md">
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-black flex items-center justify-center">
                  {isShipSelected && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span>Ship</span>
            </label>

            <label className="flex items-center p-3 rounded-md">
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {!isShipSelected && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span>Pickup in store</span>
            </label>
          </div>
        </div>

        {/* Ship To */}
        <div className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-apercu-medium">Ship to</h2>
            <ChevronDown size={20} />
          </div>
          <p className="text-sm">David Tindale, 365 H Street, 52283, Blaine WA 98230, US</p>
        </div>

        {/* Delivery Method */}
        <div className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-apercu-medium">How do you want your order delivered?</h2>
            <ChevronDown size={20} />
          </div>
          <p className="text-sm">
            Standard (3-7 business days) · <span className="font-apercu-bold">Free</span>
          </p>
        </div>

        {/* Payment Method */}
        <div className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-apercu-medium">Payment method</h2>
            <ChevronDown size={20} />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-7 mr-2 flex items-center justify-center">
              <Image src="/images/mastercard.svg" alt="Mastercard" width={46} height={29} className="object-contain" />
            </div>
            <span className="text-sm">Mastercard •••• 3207</span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-6">
          <label className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={isNewsletterChecked}
                onChange={() => setIsNewsletterChecked(!isNewsletterChecked)}
                className="h-4 w-4 border border-gray-300 rounded"
              />
            </div>
            <span className="ml-2 text-sm">Sign me up for news and offers from this store</span>
          </label>
        </div>

        {/* Gift Options */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-3">Gift Options</h2>
          <label className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={isGiftMessageChecked}
                onChange={() => setIsGiftMessageChecked(!isGiftMessageChecked)}
                className="h-4 w-4 border border-gray-300 rounded"
              />
            </div>
            <span className="ml-2 text-sm">Add a gift message</span>
          </label>
        </div>

        {/* Pink Pouch Option */}
        <div className="mb-8">
          <h2 className="font-apercu-medium mb-3">Would you like a free Pink Pouch?</h2>
          <div className="border border-gray-200 p-4 rounded-md">
            <label className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isPinkPouchChecked}
                  onChange={() => setIsPinkPouchChecked(!isPinkPouchChecked)}
                  className="h-4 w-4 border border-gray-300 rounded"
                />
              </div>
              <div className="ml-2">
                <span className="text-sm font-apercu-medium">Pink Pouch</span>
                <p className="text-sm text-gray-600 mt-1">
                  Check this box to receive your items with a free Pink Pouch. (All orders include a seasonal sticker
                  even if you don't check this box.)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Pay Now Button */}
        <button className="w-full bg-black text-white py-4 rounded mb-4 font-apercu-medium">Pay now</button>

        {/* Guest Checkout Link */}
        <div className="text-center mb-8">
          <button className="text-sm text-gray-600 underline">Check out as guest</button>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap text-sm text-gray-600 gap-4 justify-center">
          <a href="#" className="hover:underline">
            Refund policy
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Terms of service
          </a>
          <a href="#" className="hover:underline">
            Cancellation policy
          </a>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="bg-gray-50 p-6 lg:p-10 lg:w-[450px]">
        {/* Product Items */}
        <div className="space-y-6 mb-8">
          {/* Product 1 */}
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-[84px] h-[84px] bg-white border border-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/glossier-you-reve.png"
                  alt="Glossier You Rêve"
                  width={48}
                  height={84}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                1
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-apercu-medium">Glossier You Rêve</h3>
                <span className="font-apercu-medium">$32.00</span>
              </div>
              <p className="text-sm text-gray-600">8 mL</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-[84px] h-[84px] bg-white border border-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/body-hero-oil-mist.png"
                  alt="Body Hero Dry-Touch Oil Mist"
                  width={48}
                  height={84}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                1
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-apercu-medium">Body Hero Dry-Touch Oil</h3>
                <span className="font-apercu-medium">$30.00</span>
              </div>
              <p className="text-sm text-gray-600">40 mL</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-[84px] h-[84px] bg-white border border-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/after-baume.png"
                  alt="After Baume"
                  width={120}
                  height={84}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                1
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-apercu-medium">After Baume</h3>
                <span className="font-apercu-medium">$32.00</span>
              </div>
              <p className="text-sm text-gray-600">50 mL</p>
            </div>
          </div>
        </div>

        {/* Discount Code */}
        <div className="flex mb-8">
          <input
            type="text"
            placeholder="Discount code or gift card"
            className="flex-1 border border-gray-300 rounded-l-md p-3 text-sm focus:outline-none"
          />
          <button className="bg-gray-200 text-gray-800 px-4 rounded-r-md text-sm font-apercu-medium">Apply</button>
        </div>

        {/* Order Summary */}
        <div className="space-y-3 border-t pt-6">
          <div className="flex justify-between">
            <span>Subtotal · 3 items</span>
            <span className="font-apercu-medium">$94.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-apercu-bold">Free</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span>Estimated taxes</span>
              <Info size={16} className="ml-1 text-gray-400" />
            </div>
            <span>$8.46</span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t text-lg">
            <span className="font-apercu-bold">Total</span>
            <div className="flex items-baseline">
              <span className="text-xs text-gray-500 mr-1">USD</span>
              <span className="font-apercu-bold">$102.46</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
