export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  1.877.263.5300
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">California</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  California Privacy Rights
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  California Transparency Act
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center">
                  Your Privacy Choices
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M7 12L10 15L17 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Accessibility Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
          © lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7
        </div>
      </div>
    </footer>
  )
}
