// next
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// db
import { ItemSubType, ItemType, Manufacturer, Rarity } from "@prisma/client"
import { postItem } from "types/schema"
import { prisma } from "db"

// components
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

export default async function NewItem() {
  const sets = await prisma.set.findMany({ where: { progress: { not: "REQUESTED" } } })

  async function requestItem(formData: FormData) {
    "use server"

    // set itemProgress to REQUESTED
    formData.append("itemProgress", "REQUESTED")

    // convert formData to json
    const json = Object.fromEntries(formData)
    let postData = postItem.parse(json)

    // replace 0's with undefined
    postData["setId"] = postData["setId"] === 0 ? undefined : postData["setId"]

    // create data
    const item = await prisma.item.create({ data: postData })

    // revalidate cache and redirect
    revalidatePath("/")
    redirect(`/items/${item.id}`)
  }

  return (
    <main className="flex flex-col flex-wrap min-h-screen m-4">
      <DetailPageHeading>New Item Request</DetailPageHeading>
      <form action={requestItem} className="flex flex-col items-center">
        <fieldset className="bg-black bg-opacity-40 p-4 w-11/12 sm:w-3/5">
          <legend className="text-xl">Item Details</legend>
          <div className="flex flex-col mt-4">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="h-8 text-black" />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="rarity">Rarity</label>
            <select name="rarity" className="h-8 text-black">
              {Object.values(Rarity).map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="item_type">Item Type</label>
            <select name="itemType" className="h-8 text-black">
              {Object.values(ItemType).map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="item_sub_type">Item Sub Type</label>
            <select name="itemSubType" className="h-8 text-black">
              {Object.values(ItemSubType).map((itemSubType) => (
                <option key={itemSubType} value={itemSubType}>
                  {itemSubType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="manufacturer">Manufactuer</label>
            <select name="manufacturer" className="h-8 text-black">
              {Object.values(Manufacturer).map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="set">Set</label>
            <select name="set" className="h-8 text-black">
              <option value="0">NONE</option>
              {sets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="intrinsic_perk">Intrinsic Perk</label>
            <textarea name="intrinsicPerk" className="h-32 text-black"></textarea>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="flavor_text">Flavor Text</label>
            <textarea name="flavorText" className="h-32 text-black"></textarea>
          </div>
        </fieldset>
        <button type="submit" className="border border-white p-2">
          Submit Item
        </button>
      </form>
    </main>
  )
}
