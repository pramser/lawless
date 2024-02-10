// next
import { Oswald } from "next/font/google"
import Link from "next/link"

// db
import { ItemSubType, Manufacturer } from "@prisma/client"
import { prisma } from "db"

// components
import DetailPageHeading from "@/DetailPageHeading"
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
      <DetailPageHeading>{item?.name}</DetailPageHeading>
      <p className="-mt-2 mx-2 text-white text-md" style={oswald.style}>
        <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
        {item.manufacturer !== Manufacturer.NONE && ` | ${item.manufacturer} `} |{" "}
        {item.itemSubType === ItemSubType.NONE ? item.itemType : item.itemSubType}
      </p>

      {item.stats && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Stats</h2>
          <Stats stats={item.stats} />
        </div>
      )}

      <h2 className="mb-2 mt-4 text-xl underline">Basic Information</h2>
      <p>Entry: {item.progress}</p>

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
          <Link className="styled-button" href={`/sets/${item.set.id}`}>
            View Set
          </Link>
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
