import Image from "next/image"
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingBag,
  Heart,
  X,
  CreditCard,
  Truck,
  RotateCcw,
  Store,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import QuickCheckoutModal from "@/components/quick-checkout-modal"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
            <button className="p-2">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/louis-vuitton-logo.png"
              alt="LOUIS VUITTON"
              width={180}
              height={30}
              style={{ height: "auto", width: "180px" }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-xs">
              <span className="sr-only">Contact Us</span>
              Contact Us
            </button>
            <button className="p-2">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2">
              <span className="sr-only">Account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="p-2 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3 bg-gray-50 px-4 pb-12">
            <div className="max-w-[800px] mx-auto">
              <div className="flex items-center justify-between py-6">
                <h1 className="text-xl font-normal">
                  My Shopping Cart <span className="text-sm text-gray-500">(2)</span>
                </h1>
                <button className="text-sm underline">Continue Shopping</button>
              </div>

              {/* Cart Item 1 */}
              <div className="border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 bg-white p-0">
                    <div className="relative w-full" style={{ height: "400px" }}>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-17%20at%207.53.31%E2%80%AFPM-AxuCDDpBn6DNfNRSi8KP6WFCE0sluH.png"
                        alt="Speedy Soft 30 Crafty"
                        fill
                        className="object-cover w-full"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white flex flex-col">
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-1">M11945</p>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-normal">Speedy Soft 30 Crafty</h2>
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-normal">Color</span>
                          <span className="text-sm font-normal text-right">Monogram Rouge</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-normal">Material</span>
                          <span className="text-sm font-normal text-right">Monogram</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-6">
                          <Select defaultValue="1">
                            <SelectTrigger className="w-24 h-12 border-gray-300">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-base font-normal">$3,400.00</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex items-center justify-center py-3 text-sm border border-gray-200">
                            <Heart className="h-5 w-5 mr-2" />
                            Add to Wishlist
                          </button>
                          <button className="flex items-center justify-center py-3 text-sm border border-gray-200">
                            <X className="h-5 w-5 mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Item 2 */}
              <div className="border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 bg-white p-0">
                    <div className="relative w-full" style={{ height: "400px" }}>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-17%20at%207.52.46%E2%80%AFPM-P1jq38VRWzm9gsZZ44JRlZ9WqOVss8.png"
                        alt="Monogram Bloom Belted Dress"
                        fill
                        className="object-cover w-full"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white flex flex-col">
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-1">1A9H2D</p>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-normal">Monogram Bloom Belted Dress</h2>
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-normal">Color</span>
                          <span className="text-sm font-normal text-right">Milky White</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-normal">Size</span>
                          <span className="text-sm font-normal text-right">34</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-6">
                          <Select defaultValue="1">
                            <SelectTrigger className="w-24 h-12 border-gray-300">
                              <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-base font-normal">$4,400.00</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex items-center justify-center py-3 text-sm border border-gray-200">
                            <Heart className="h-5 w-5 mr-2" />
                            Add to Wishlist
                          </button>
                          <button className="flex items-center justify-center py-3 text-sm border border-gray-200">
                            <X className="h-5 w-5 mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3 bg-white lg:min-h-screen">
            <div className="p-6">
              <h2 className="text-lg font-normal mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-normal">$7,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-normal">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm font-normal">$0.00</span>
                </div>
                <p className="text-xs text-gray-500">Will be calculated according to your delivery address</p>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="text-base font-normal">Total</span>
                <span className="text-base font-normal">$7,800.00</span>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-none border border-gray-300 text-black font-normal flex items-center justify-center"
                >
                  <span className="flex items-center">Proceed to Checkout</span>
                </Button>
                <QuickCheckoutModal />
              </div>
            </div>

            {/* Service Information */}
            <div className="border-t border-gray-200">
              <div className="py-6 px-6 flex items-start">
                <div className="mr-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <CreditCard className="h-3 w-3 text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-normal mb-1">Payment</h3>
                  <p className="text-xs text-gray-500">Credit card, debit card, PayPal, or Apple Pay</p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>

              <div className="py-6 px-6 flex items-start border-t border-gray-200">
                <div className="mr-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="h-3 w-3 text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-normal mb-1">Shipping & Delivery</h3>
                  <p className="text-xs text-gray-500">Complimentary Standard Delivery</p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>

              <div className="py-6 px-6 flex items-start border-t border-gray-200">
                <div className="mr-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-3 w-3 text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-normal mb-1">Returns & Exchanges</h3>
                  <p className="text-xs text-gray-500">Complimentary</p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>

              <div className="py-6 px-6 flex items-start border-t border-gray-200">
                <div className="mr-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Store className="h-3 w-3 text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-normal mb-1">Next Day Collect-In-Store</h3>
                  <p className="text-xs text-gray-500"></p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>

              <div className="py-6 px-6 flex items-start border-t border-gray-200">
                <div className="mr-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Gift className="h-3 w-3 text-black" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-normal mb-1">Gifting</h3>
                  <p className="text-xs text-gray-500">Discover all the details behind the perfect gift</p>
                </div>
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 lg:pl-4 lg:pr-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 lg:ml-0">
            <div>
              <h3 className="text-sm font-normal mb-4">HELP</h3>
              <ul className="space-y-2">
                <li className="text-xs">
                  Our Client Advisors are available to assist you by phone at +1-866-VUITTON, or you may also chat with
                  us.
                </li>
                <li className="text-xs underline">FAQs</li>
                <li className="text-xs underline">Product Care</li>
                <li className="text-xs underline">Stores</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-normal mb-4">SERVICES</h3>
              <ul className="space-y-2">
                <li className="text-xs underline">Repairs</li>
                <li className="text-xs underline">Personalization</li>
                <li className="text-xs underline">Art of Gifting</li>
                <li className="text-xs underline">Download our Apps</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-normal mb-4">ABOUT LOUIS VUITTON</h3>
              <ul className="space-y-2">
                <li className="text-xs underline">Fashion Shows</li>
                <li className="text-xs underline">Arts & Culture</li>
                <li className="text-xs underline">La Maison</li>
                <li className="text-xs underline">Sustainability</li>
                <li className="text-xs underline">Latest News</li>
                <li className="text-xs underline">Careers</li>
                <li className="text-xs underline">Foundation Louis Vuitton</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-200 lg:ml-0">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xs mr-2">Ship to:</span>
              <Image src="/us-flag.svg" alt="US Flag" width={20} height={15} className="mr-2" />
              <span className="text-xs">United States of America</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-xs">Sitemap</span>
              <span className="text-xs">Legal Notices</span>
              <span className="text-xs">Privacy Policy</span>
              <span className="text-xs">California Supply Chains Act</span>
              <span className="text-xs">Do Not Sell or Share My Personal Information</span>
              <span className="text-xs">Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
