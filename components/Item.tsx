"use client"

// next
import { Oswald } from "next/font/google"
import { useRouter } from "next/navigation"

// db
import { ItemSubType } from "@prisma/client"

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default function Item({ item }: any) {
  const router = useRouter()

  return (
    <div
      className={`bg-black bg-opacity-40 hover:bg-gray-400 border-${item.rarity.toLowerCase()} h-16 m-2 p-3 w-screen sm:w-64`}
      onClick={() => router.push(`/item/${item.id}`)}
    >
      <h1 className="font-medium text-ellipsis text-md truncate uppercase whitespace-nowrap" style={oswald.style}>
        {item.name}
      </h1>
      <p className="text-white text-ellipsis text-xs truncate whitespace-nowrap">
        <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span> |{" "}
        {item.itemSubType === ItemSubType.NONE ? item.itemType : item.itemSubType}
      </p>
    </div>
  )
}
