import localFont from "next/font/local"

export const apercu = {
  regular: localFont({
    src: "../public/fonts/Apercu-Regular.ttf",
    variable: "--font-apercu-regular",
    display: "swap",
    weight: "400",
  }),
  medium: localFont({
    src: "../public/fonts/Apercu-Medium.ttf",
    variable: "--font-apercu-medium",
    display: "swap",
    weight: "500",
  }),
  bold: localFont({
    src: "../public/fonts/Apercu-Bold.ttf",
    variable: "--font-apercu-bold",
    display: "swap",
    weight: "700",
  }),
}
