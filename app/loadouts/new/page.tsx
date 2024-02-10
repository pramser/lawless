// db
import { Characters, ItemType } from "@prisma/client"
import { prisma } from "db"

// components
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

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

const colors = ["GREEN", "BLUE", "PURPLE"]

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
            <label>Name</label>
            <input name="name" type="text" />
          </div>
          <div className="flex flex-col">
            <label>Character</label>
            <select name="character" className="text-black">
              {Object.values(Characters).map((character) => (
                <option value={character}>{character}</option>
              ))}
            </select>
          </div>
        </fieldset>
        <div className="flex flex-col flex-wrap sm:flex-row mt-4">
          {sections.map((section: any) => (
            <fieldset key={section.name} className="bg-black bg-opacity-40 w-screen sm:w-1/2">
              <legend className="ml-4">{section.name}</legend>
              <div className="flex flex-col m-2 p-3">
                <label>Item</label>
                <select name={`${section.name}.itemId`} className="text-black">
                  {items
                    .filter((it) => it.itemType === section.itemType)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <label>Augments</label>
                {colors.map((color) => (
                  <select name={`${section.name}.augments.${color}`} className="text-black">
                    <option value="None">None</option>
                    {augments
                      .filter((a) => a.itemType === section.itemType && a.augmentColor === color)
                      .map((augment) => (
                        <option key={augment.id} value={augment.description}>
                          {augment.description}
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </form>
    </main>
  )
}
