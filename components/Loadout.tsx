"use client"

// next
import { Oswald } from "next/font/google"
import { useRouter } from "next/navigation"

// db
import { Loadout } from "@prisma/client"

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

interface LoadoutProps {
  loadout: Loadout
}

export default function Loadout({ loadout }: LoadoutProps) {
  const router = useRouter()

  return (
    <div
      className={`bg-black bg-opacity-40 hover:bg-gray-400 border-common h-16 m-2 p-3 w-screen sm:w-64`}
      onClick={() => router.push(`/loadouts/${loadout.id}`)}
    >
      <h1 className="font-medium text-ellipsis text-md truncate uppercase whitespace-nowrap" style={oswald.style}>
        {loadout.name}
      </h1>
    </div>
  )
}
