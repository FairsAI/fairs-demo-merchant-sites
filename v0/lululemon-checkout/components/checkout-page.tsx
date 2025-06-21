import CartSection from "./cart-section"
import OrderSummary from "./order-summary"
import SavedItems from "./saved-items"

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartSection />
        <SavedItems />
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}
