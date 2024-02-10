// next
import Link from "next/link"
import { Oswald } from "next/font/google"

// db
import { prisma } from "db"
import { ItemSubType } from "@prisma/client"

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

interface ItemSlotProps {
  itemId: number
}

export default async function ItemSlot({ itemId }: ItemSlotProps) {
  const item = await prisma.item.findFirst({ where: { id: itemId } })

  return (
    <Link href={`/items/${itemId}`}>
      <div
        className={`bg-black bg-opacity-40 hover:bg-gray-400 border-${item?.rarity.toLowerCase()} flex flex-col h-24 items-center justify-center m-2 p-3`}
      >
        <h2 className="text-2xl uppercase" style={oswald.style}>
          {item?.name}
        </h2>
        <p className="text-white text-ellipsis text-md truncate whitespace-nowrap">
          <span className={`text-${item?.rarity.toLowerCase()}`}>{item?.rarity}</span> |{" "}
          {item?.itemSubType === ItemSubType.NONE ? item.itemType : item?.itemSubType}
        </p>
      </div>
    </Link>
  )
}
