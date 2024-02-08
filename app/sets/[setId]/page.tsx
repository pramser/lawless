// next
import Link from "next/link"
import { Oswald } from "next/font/google"

// db
import { ItemSubType } from "@prisma/client"
import { prisma } from "db"
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default async function SetDetail({ params: { setId } }: any) {
  const id = parseInt(setId)

  if (!id) {
    return <main className="min-h-screen m-4">Invalid item ID</main>
  }

  const set = await prisma.set.findFirst({ where: { id }, include: { items: true } })
  if (!set) {
    return <main className="min-h-screen m-4">Item not found</main>
  }

  return (
    <main className="flex flex-col flex-wrap min-h-screen m-4">
      <DetailPageHeading>{set?.name}</DetailPageHeading>
      <div>
        <h2 className="mb-2 mt-4 text-xl underline">Set Information</h2>
        <p>Name: {set?.name}</p>
        <p>Character: {set.character}</p>
        <p>Required Items: {set.requiredItems}</p>
        <p>Tier: {set.tier}</p>
        <h3 className="font-medium mb-1 mt-2 text-lg">Flavor Text:</h3>
        <p className="bg-black bg-opacity-40 border border-slate-500 italic p-4">{set.flavorText}</p>
        <h3 className="font-medium mb-1 mt-2 text-lg">Perk:</h3>
        <ul className="bg-black bg-opacity-40 border border-slate-500 p-4">
          {set.perk
            ?.substring(1)
            .split("-")
            .map((item, i) => (
              <li key={i} className="mb-2">
                - {item}
              </li>
            ))}
        </ul>
      </div>

      {set.items && set.items.length > 0 && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Set Items</h2>
          <div className="bg-black bg-opacity-40 border-separate border-spacing-2 border border-slate-500 max-h-48 overflow-auto w-auto">
            <ul>
              {set.items.map((item, i) => (
                <Link key={i} href={`/items/${item.id}`}>
                  <li className="hover:bg-gray-400 m-2 text-md text-white">
                    {item.name} ({item.itemSubType === ItemSubType.NONE ? item.itemType : item.itemSubType})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
