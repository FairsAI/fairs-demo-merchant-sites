import Header from "@/components/header"
import CheckoutPage from "@/components/checkout-page"
import Footer from "@/components/footer"
import GiftCardBanner from "@/components/gift-card-banner"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <GiftCardBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
