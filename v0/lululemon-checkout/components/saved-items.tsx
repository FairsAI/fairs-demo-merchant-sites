import { User } from "lucide-react"

export default function SavedItems() {
  return (
    <div className="border border-gray-200 rounded-md p-6 mb-8 bg-white pr-4 sm:pr-8 lg:pr-12">
      <h2 className="text-xl font-bold mb-4">Saved Items</h2>
      <div className="flex items-center">
        <User size={20} className="mr-3" />
        <p>
          <a href="#" className="underline font-medium">
            Sign in
          </a>{" "}
          or{" "}
          <a href="#" className="underline font-medium">
            join Membership
          </a>{" "}
          to easily save your items for later.
        </p>
      </div>
    </div>
  )
}
