// next
import { Oswald } from "next/font/google"

// db
import { ItemSubType, ItemType, Manufacturer } from "@prisma/client"
import { prisma } from "db"

// components
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

const sections = [
  { name: "FIREARM 1", itemType: ItemType.FIREARM },
  { name: "FIREARM 2", itemType: ItemType.FIREARM },
  { name: "MELEE", itemType: ItemType.MELEE },
  { name: "GRENADE", itemType: ItemType.GRENADE },
  { name: "SHIELD MOD", itemType: ItemType.SHIELD_MOD },
  { name: "TRAVERSAL MOD", itemType: ItemType.TRAVERSAL_MOD },
  { name: "NECK BOMB MOD", itemType: ItemType.NECKBOMB_MOD },
  { name: "LUCKY CHARM", itemType: ItemType.LUCKY_CHARM },
]

export default async function NewLoadout() {
  const items = await prisma.item.findMany()
  const augments = await prisma.augment.findMany()

  return (
    <main className="flex flex-col flex-wrap min-h-screen">
      <DetailPageHeading>New Loadout Request</DetailPageHeading>
      <form>
        <fieldset className="bg-black bg-opacity-40 m-4 p-2">
          <legend>Basic Details</legend>
          <div className="flex flex-col">
            <p>Name</p>
            <p>Character</p>
          </div>
        </fieldset>
        <div className="flex flex-col flex-wrap sm:flex-row mt-4">
          {sections.map((section: any) => (
            <fieldset className="bg-black bg-opacity-40 w-screen sm:w-1/2">
              <legend className="ml-4">{section.name}</legend>
              <div className="flex flex-col m-2 p-3">
                <label>Item</label>
                <select className="text-black">
                  {items
                    .filter((it) => it.itemType === section.itemType)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <label>Augments</label>
                <select className="text-black">
                  {augments
                    .filter((au) => au.itemType === section.itemType && au.augmentColor === "GREEN")
                    .map((augment) => (
                      <option key={augment.id} value={augment.id}>
                        {augment.description}
                      </option>
                    ))}
                </select>
                <select className="text-black">
                  {augments
                    .filter((au) => au.itemType === section.itemType && au.augmentColor === "BLUE")
                    .map((augment) => (
                      <option key={augment.id} value={augment.id}>
                        {augment.description}
                      </option>
                    ))}
                </select>
                <select className="text-black">
                  {augments
                    .filter((au) => au.itemType === section.itemType && au.augmentColor === "PURPLE")
                    .map((augment) => (
                      <option key={augment.id} value={augment.id}>
                        {augment.description}
                      </option>
                    ))}
                </select>
              </div>
            </fieldset>
          ))}
        </div>
      </form>
    </main>
  )
}
