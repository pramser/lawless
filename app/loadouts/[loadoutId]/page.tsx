// next
import Link from "next/link"
import { Oswald } from "next/font/google"

// db
import { prisma } from "db"
import { ItemSubType } from "@prisma/client"
import BackButton from "@/BackButton"
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default async function LoadoutDetail({ params: { loadoutId } }: any) {
  const id = parseInt(loadoutId)

  if (!id) {
    return <main className="min-h-screen m-4">Invalid item ID</main>
  }

  const loadout = await prisma.loadout.findFirst({ where: { id } })
  if (!loadout) {
    return <main className="min-h-screen m-4">Loadout not found</main>
  }

  const items = await prisma.item.findMany({
    where: {
      id: {
        in: [
          loadout.firearm_1 || 0,
          loadout.firearm_2 || 0,
          loadout.melee || 0,
          loadout.grenade || 0,
          loadout.shield_mod || 0,
          loadout.traversal_mod || 0,
          loadout.neck_bomb_mod || 0,
          loadout.lucky_charm || 0,
        ],
      },
    },
  })
  if (!items || items.length === 0) {
    return <main className="min-h-screen m-4">Loadout not found</main>
  }

  return (
    <main className="flex flex-col flex-wrap min-h-screen">
      <DetailPageHeading>{loadout?.name}</DetailPageHeading>
      <div className="flex flex-col flex-wrap sm:flex-row">
        {items.map((item) => (
          <div key={item.id} className="w-screen sm:w-1/2">
            <h2>{item.itemType}</h2>
            <Link href={`/items/${item.id}`}>
              <div
                className={`bg-black bg-opacity-40 hover:bg-gray-400 border-${item.rarity.toLowerCase()} flex flex-col h-24 items-center justify-center m-2 p-3`}
              >
                <h2 className="text-2xl uppercase" style={oswald.style}>
                  {item.name}
                </h2>
                <p className="text-white text-ellipsis text-md truncate whitespace-nowrap">
                  <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span> |{" "}
                  {item.itemSubType === ItemSubType.NONE ? item.itemType : item.itemSubType}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
