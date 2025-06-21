import localFont from "next/font/local"

export const futura = localFont({
  src: "./fonts/futura-book-webfont.woff2",
  display: "swap",
  variable: "--font-futura",
  preload: true,
  weight: "600",
})
