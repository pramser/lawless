// next
import { Oswald } from "next/font/google"

// db
import { ItemSubType, ItemType, Manufacturer } from "@prisma/client"

// components
import DetailPageHeading from "@/DetailPageHeading"
import { prisma } from "db"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default async function NewItem() {
  const sets = await prisma.set.findMany({ where: { itemProgress: { not: "REQUESTED" } } })

  return (
    <main className="flex flex-col flex-wrap min-h-screen m-4">
      <DetailPageHeading>New Item Request</DetailPageHeading>
      <form>
        <fieldset>
          <legend className="text-xl">Item Details</legend>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="h-8 max-w-96 text-black" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="item_type">Item Type</label>
            <select id="item_type" className="h-8 max-w-96 text-black">
              {Object.values(ItemType).map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="item_sub_type">Item Sub Type</label>
            <select id="item_sub_type" className="h-8 max-w-96 text-black">
              {Object.values(ItemSubType).map((itemSubType) => (
                <option key={itemSubType} value={itemSubType}>
                  {itemSubType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="set">Set</label>
            <select id="set" className="h-8 max-w-96 text-black">
              {sets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="stats">Stats</label>
            <textarea id="stats" className="h-32 max-w-96 text-black"></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="intrinsic_perk">Intrinsic Perk</label>
            <textarea id="intrinsic_perk" className="h-32 max-w-96 text-black"></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="flavor_text">Flavor Text</label>
            <textarea id="flavor_text" className="h-32 max-w-96 text-black"></textarea>
          </div>
        </fieldset>
        <button className="border border-white p-2">Submit Item</button>
      </form>
    </main>
  )
}
