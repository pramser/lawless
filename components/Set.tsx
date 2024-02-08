"use client"

// next
import { Oswald } from "next/font/google"
import { useRouter } from "next/navigation"

// db
import { Set } from "@prisma/client"

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

interface SetProps {
  set: Set
}

export default function Set({ set }: SetProps) {
  const router = useRouter()

  return (
    <div
      className={`bg-black bg-opacity-40 hover:bg-gray-400 border-infamous h-16 m-2 p-3 w-screen sm:w-64`}
      onClick={() => router.push(`/sets/${set.id}`)}
    >
      <h1 className="font-medium text-ellipsis text-md truncate uppercase whitespace-nowrap" style={oswald.style}>
        {set.name}
      </h1>
      <p className="text-white text-ellipsis text-xs truncate whitespace-nowrap">
        <span>
          Tier {set.tier} - {set.requiredItems} Pieces
        </span>
      </p>
    </div>
  )
}
