// next
import type { Metadata } from "next"

// css
import "./globals.css"

// components
import Header from "@/Header"

export const metadata: Metadata = {
  title: "lawless.gg",
  description: "Suicide Squad: Kill the Justice League Loot",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen m-4">{children}</main>
      </body>
    </html>
  )
}
