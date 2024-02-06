// next
import Link from "next/link"
import { Oswald } from "next/font/google"

// db
import { Manufacturer } from "@prisma/client"
import { prisma } from "db"

// components
import Stats from "@/Stats"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default async function ItemDetail({ params: { itemId } }: any) {
  const id = parseInt(itemId)

  if (!id) {
    return <main className="min-h-screen m-4">Invalid item ID</main>
  }

  const item = await prisma.item.findFirst({ where: { id }, include: { set: true } })
  if (!item) {
    return <main className="min-h-screen m-4">Item not found</main>
  }

  const augments = await prisma.augment.findMany({ where: { itemType: item.itemType } })

  return (
    <main className="flex flex-col flex-wrap min-h-screen m-4">
      <Link className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white py-1 px-2 mb-4 rounded-sm w-24" href="/">
        ↩ Back
      </Link>
      <h1 className="border-b-2 font-medium text-3xl uppercase" style={oswald.style}>
        {item?.name}
      </h1>
      <p className="mt-2 text-white text-sm">
        <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
        {item.manufacturer !== Manufacturer.NONE && ` | ${item.manufacturer} `} | {item.itemSubType ?? item.itemType}
      </p>

      {item.stats && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Stats</h2>
          <Stats stats={item.stats} />
        </div>
      )}

      <h2 className="mb-2 mt-4 text-xl underline">Basic Information</h2>
      <p>Entry: {item.itemProgress}</p>
      <p>Item Type: {item.itemType}</p>
      <p>Item Sub Type: {item.itemSubType}</p>
      <p>Item Rarity: {item.rarity}</p>
      <p>Manufacturer: {item.manufacturer}</p>

      {item.intrinsicPerk && (
        <div>
          <h3 className="font-medium mb-1 mt-2 text-lg">Intrinsic Perk:</h3>
          <p className="bg-black bg-opacity-40 border border-slate-500 p-4">{item.intrinsicPerk}</p>
        </div>
      )}

      {item.flavorText && (
        <div>
          <h3 className="font-medium mb-1 mt-2 text-lg">Flavor Text: </h3>
          <p className="bg-black bg-opacity-40 border border-slate-500 italic p-4">{item.flavorText}</p>
        </div>
      )}

      {item.set && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Set Information</h2>
          <p>Name: {item.set?.name}</p>
          <p>Character: {item.set.character}</p>
          <p>Required Items: {item.set.requiredItems}</p>
          <p>Tier: {item.set.tier}</p>
          <h3 className="font-medium mb-1 mt-2 text-lg">Flavor Text:</h3>
          <p className="bg-black bg-opacity-40 border border-slate-500 italic p-4">{item.set.flavorText}</p>
          <h3 className="font-medium mb-1 mt-2 text-lg">Perk:</h3>
          <ul className="bg-black bg-opacity-40 border border-slate-500 p-4">
            {item.set.perk
              ?.substring(1)
              .split("-")
              .map((item, i) => (
                <li key={i} className="mb-2">
                  - {item}
                </li>
              ))}
          </ul>
        </div>
      )}

      {augments && augments.length > 0 && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Possible Augments</h2>
          <div className="bg-black bg-opacity-40 border-separate border-spacing-2 border border-slate-500 max-h-48 overflow-auto w-auto">
            <ul>
              {augments.map((augment, i) => (
                <li key={i} className={`augment-${augment.augmentColor.toLowerCase()} m-2 text-2xl`}>
                  &nbsp;•&nbsp;<span className="text-sm text-white">{augment.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
