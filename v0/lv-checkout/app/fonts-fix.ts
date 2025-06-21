import localFont from "next/font/local"

// Let's try a different approach with a more direct path
export const futura = localFont({
  src: "./fonts/futura-light-bt.ttf", // Path relative to the app directory
  display: "swap",
  variable: "--font-futura",
})
