// next
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// db
import { Characters, ItemType } from "@prisma/client"
import { postLoadout } from "types/schema"
import { prisma } from "db"

// components
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

const sections = [
  { name: "firearm_1", itemType: ItemType.FIREARM },
  { name: "firearm_2", itemType: ItemType.FIREARM },
  { name: "melee", itemType: ItemType.MELEE },
  { name: "grenade", itemType: ItemType.GRENADE },
  { name: "shield_mod", itemType: ItemType.SHIELD_MOD },
  { name: "traversal_mod", itemType: ItemType.TRAVERSAL_MOD },
  { name: "neck_bomb_mod", itemType: ItemType.NECKBOMB_MOD },
  { name: "lucky_charm", itemType: ItemType.LUCKY_CHARM },
]

const colors = ["GREEN", "BLUE", "PURPLE"]

export default async function NewLoadout() {
  const items = await prisma.item.findMany()
  const augments = await prisma.augment.findMany()

  async function requestLoadout(formData: FormData) {
    "use server"

    // set itemProgress to REQUESTED
    formData.append("progress", "REQUESTED")
    formData.append("version", "1")

    // convert formData to json
    const json = Object.fromEntries(formData)
    let postData = postLoadout.parse(json)

    let data: any[] = []
    sections.forEach((section) => {
      const augments = colors.map((color) => {
        const key = `${section.name}.augments.${color}`
        return json[key] !== "None" ? { color, description: json[key] } : null
      })
      data.push({
        name: section.name,
        itemId: json[`${section.name}.itemId`],
        augments,
      })
    })

    // create data
    const loadout = await prisma.loadout.create({ data: { ...postData, data } })

    // revalidate cache and redirect
    revalidatePath("/")
    redirect(`/loadouts/${loadout.id}`)
  }

  return (
    <main className="flex flex-col flex-wrap min-h-screen">
      <DetailPageHeading>New Loadout Request</DetailPageHeading>
      <form action={requestLoadout}>
        <fieldset className="bg-black bg-opacity-40 m-4 p-2">
          <legend>Basic Details</legend>
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" type="text" className="text-black" />
          </div>
          <div className="flex flex-col">
            <label>Character</label>
            <select name="character" className="text-black">
              {Object.values(Characters).map((character) => (
                <option key={character} value={character}>
                  {character}
                </option>
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
                  <select key={color} name={`${section.name}.augments.${color}`} className="text-black">
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
          <button type="submit">Request Loadout</button>
        </div>
      </form>
    </main>
  )
}
