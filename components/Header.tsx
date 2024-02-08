"use client"

// next font
import { Rock_Salt } from "next/font/google"
import Link from "next/link"

const rock_salt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
})

type HeaderParams = {}

export default function Header({}: HeaderParams) {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-900 flex flex-row px-4 py-2 items-center text-white w-fill">
      <Link href="/" className="cursor-default text-2xl" style={rock_salt.style}>
        lawless
      </Link>
      .gg -&nbsp;
      <Link href="/sets" className="underline">
        sets
      </Link>
    </header>
  )
}
