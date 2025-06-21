import Image from "next/image"
import { User } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4 bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <Image src="/lululemon-logo.png" alt="lululemon" width={120} height={24} className="h-6 w-auto" />
        </a>
        <a href="#" className="flex items-center text-sm font-medium">
          <User size={18} className="mr-2" />
          Sign in
        </a>
      </div>
    </header>
  )
}
