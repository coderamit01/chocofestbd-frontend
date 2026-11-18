import type { Metadata } from "next";
import { Hind_Siliguri, Outfit, Poppins, Roboto } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap"
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap"
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
  display: "swap"
});
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali","latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Chocofest BD | Imported chocolates, coffee & snacks",
  description: "Imported chocolates, coffee & snacks",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${hindSiliguri.variable}  ${outfit.variable}  ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
