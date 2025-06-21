"use client"

import { useState } from "react"
import { ChevronDown, Info, Search, CreditCard } from "lucide-react"
import Image from "next/image"

export default function GlossierCheckoutNew() {
  const [isShipSelected, setIsShipSelected] = useState(true)
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false)
  const [isGiftMessageChecked, setIsGiftMessageChecked] = useState(false)
  const [isPinkPouchChecked, setIsPinkPouchChecked] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [useSameAddress, setUseSameAddress] = useState(true)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-apercu-regular">
      {/* Left Column - Checkout Information */}
      <div className="flex-1 p-6 lg:p-10 lg:max-w-[600px]">
        <div className="mb-8">
          <Image src="/images/glossier-logo.png" alt="Glossier" width={120} height={40} className="object-contain" />
        </div>

        {/* Express Checkout */}
        <div className="mb-6">
          <p className="text-center text-sm mb-3">Express checkout</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button className="bg-[#5a31f4] text-white py-3 rounded flex items-center justify-center">
              <span className="font-apercu-bold text-white">shop</span>
              <span className="font-apercu-bold text-white">Pay</span>
            </button>
            <button className="bg-[#ffc439] text-[#003087] py-3 rounded flex items-center justify-center">
              <span className="font-apercu-bold">Pay</span>
              <span className="font-apercu-bold">Pal</span>
            </button>
            <button className="bg-black text-white py-3 rounded flex items-center justify-center">
              <span className="font-apercu-bold">G Pay</span>
            </button>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 flex-grow"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="border-t border-gray-200 flex-grow"></div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-4">Contact Information</h2>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={isNewsletterChecked}
                onChange={() => setIsNewsletterChecked(!isNewsletterChecked)}
                className="h-4 w-4 border border-gray-300 rounded"
              />
            </div>
            <span className="ml-2 text-sm">Email me with news and offers</span>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-4">Delivery</h2>
          <div className="space-y-3">
            <label className="flex items-center border border-gray-300 p-3 rounded-md">
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-black flex items-center justify-center">
                  {isShipSelected && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span>Ship</span>
            </label>

            <label className="flex items-center border border-gray-300 p-3 rounded-md">
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {!isShipSelected && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span>Pickup in store</span>
            </label>
          </div>
        </div>

        {/* Address Form */}
        <div className="mb-6">
          <div className="mb-4">
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none appearance-none">
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Canada</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Apt / Floor / Suite"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
            <input
              type="text"
              placeholder="Postcode"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-3">How do you want your order delivered?</h2>
          <p className="text-sm mb-3">
            Please allow 1-3 days processing time before your order ships. Thank you for your patience.
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm">Enter your shipping address to view available shipping methods.</p>
          </div>
        </div>

        {/* Gift Options */}
        <div className="mb-6">
          <h2 className="font-apercu-medium mb-3">Gift Options</h2>
          <label className="flex items-start mb-4">
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

        {/* Payment */}
        <div className="mb-8">
          <h2 className="font-apercu-medium mb-3">Payment</h2>
          <p className="text-sm mb-4">All transactions are secure and encrypted.</p>

          <div className="space-y-3 mb-6">
            <label className="flex items-center border border-gray-300 p-3 rounded-md">
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-black flex items-center justify-center">
                  {paymentMethod === "credit" && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span className="flex-grow">Credit card</span>
              <div className="flex space-x-1">
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
              </div>
            </label>

            {paymentMethod === "credit" && (
              <div className="border border-gray-200 p-4 rounded-md">
                <div className="mb-4 relative">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
                  />
                  <CreditCard size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                    className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Security code"
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
                    />
                    <Info size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={() => setUseSameAddress(!useSameAddress)}
                    className="h-4 w-4 border border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Use shipping address as billing address</span>
                </div>
              </div>
            )}

            <label
              className="flex items-center border border-gray-300 p-3 rounded-md"
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {paymentMethod === "paypal" && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span className="flex-grow">PayPal</span>
              <div className="w-16 h-5 bg-gray-200 rounded"></div>
            </label>

            <label
              className="flex items-center border border-gray-300 p-3 rounded-md"
              onClick={() => setPaymentMethod("clearpay")}
            >
              <div className="flex items-center justify-center mr-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {paymentMethod === "clearpay" && <div className="h-2.5 w-2.5 rounded-full bg-black"></div>}
                </div>
              </div>
              <span className="flex-grow">Clearpay</span>
              <div className="w-16 h-5 bg-gray-200 rounded"></div>
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button className="w-full bg-black text-white py-4 rounded mb-8 font-apercu-medium">Place Order</button>

        {/* Footer Links */}
        <div className="flex flex-wrap text-sm text-gray-600 gap-4">
          <a href="#" className="hover:underline">
            Refund policy
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Terms of service
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
                  alt="Body Hero Dry-Touch Oil"
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
