"use client"

import { useRouter } from "next/navigation"

export default function Item({ item }: any) {
  const router = useRouter()

  return (
    <div
      className={`bg-black bg-opacity-40 hover:bg-gray-400 border-${item.rarity.toLowerCase()} h-16 m-2 p-2 w-screen sm:w-64`}
      onClick={() => router.push(`/item/${item.id}`)}
    >
      <h1 className="font-medium text-ellipsis text-sm truncate uppercase whitespace-nowrap">{item.name}</h1>
      <p className="text-white text-xs">
        <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span> | {item.itemSubType ?? item.itemType}
      </p>
    </div>
  )
}
