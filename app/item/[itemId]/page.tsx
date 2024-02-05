import { Manufacturer } from "@prisma/client"
import { prisma } from "db"
import Link from "next/link"

// revalidate every hour
export const revalidate = 3600

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
      <Link className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white py-1 px-2 mb-4 rounded-md w-24" href="/">
        ↩ Back
      </Link>
      <h1 className="border-b-2 font-medium text-xl">{item?.name}</h1>
      <p className="mt-2 text-white text-sm">
        <span className={`text-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
        {item.manufacturer !== Manufacturer.NONE && ` | ${item.manufacturer} `} | {item.itemSubType ?? item.itemType}
      </p>

      <h2 className="mb-2 mt-4 text-xl underline">Basic Information</h2>
      <p>Entry: {item.itemProgress}</p>
      <p>Item Type: {item.itemType}</p>
      <p>Item Sub Type: {item.itemSubType}</p>
      <p>Item Rarity: {item.rarity}</p>
      <p>Manufacturer: {item.manufacturer}</p>
      <p>Intrinsic Perk: {item.intrinsicPerk}</p>
      <p>Flavor Text: {item.flavorText}</p>

      {item.set && (
        <div>
          <h2 className="mb-2 mt-4 text-xl underline">Set Information</h2>
          <p>Name: {item.set?.name}</p>
          <p>Character: {item.set.character}</p>
          <p>Flavor Text: {item.set.flavorText}</p>
          <p>Perk: {item.set.perk}</p>
          <p>Required Items: {item.set.requiredItems}</p>
          <p>Tier: {item.set.tier}</p>
        </div>
      )}

      <h2 className="mb-2 mt-4 text-xl underline">Possible Augments</h2>
      <table className="bg-black bg-opacity-40 border-separate border-spacing-2 border border-slate-500 w-auto">
        <tbody>
          {augments.map((augment) => (
            <tr key={augment.id}>
              <td className={`augment-${augment.augmentColor.toLowerCase()} pl-2 text-2xl w-2`}>•</td>
              <td className="text-sm">{augment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
