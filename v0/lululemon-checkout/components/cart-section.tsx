import { ThumbsUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CartItem from "./cart-item"

export default function CartSection() {
  const cartItems = [
    {
      id: 1,
      name: "lululemon Align™ Waist-Length Racerback Tank Top",
      color: "Washed Denim",
      size: "0",
      price: 58.0,
      quantity: 1,
      image: "/lulu-top.webp",
    },
    {
      id: 2,
      name: 'Wunder Under SmoothCover High-Rise Tight 25"',
      color: "Washed Denim",
      size: "0",
      price: 98.0,
      quantity: 1,
      image: "/lulu-bottom.webp",
    },
  ]

  return (
    <div className="mb-8 pr-4 sm:pr-8 lg:pr-12">
      <h1 className="text-2xl font-bold mb-4">My Bag (2 Items)</h1>

      <Alert className="mb-6 bg-gray-100 border-black flex items-center">
        <ThumbsUp className="h-4 w-4 mr-2" />
        <AlertDescription>These items are going fast. Check out now to make them yours.</AlertDescription>
      </Alert>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
