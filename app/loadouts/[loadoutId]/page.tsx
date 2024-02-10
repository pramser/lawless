// next
import { Oswald } from "next/font/google"

// db
import { prisma } from "db"
import { Prisma } from "@prisma/client"

// components
import DetailPageHeading from "@/DetailPageHeading"
import LoadoutDetails from "@/LoadoutDetails"

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
  if (!loadout || !loadout.data) {
    return <main className="min-h-screen m-4">Loadout not found</main>
  }

  const data = loadout.data as Prisma.JsonArray

  return (
    <main className="flex flex-col flex-wrap min-h-screen">
      <div className="m-4">
        <DetailPageHeading>{loadout?.name}</DetailPageHeading>
        <p className="-mt-2 mx-2 text-white text-md" style={oswald.style}>
          LOADOUT | {loadout?.character}
        </p>
      </div>
      <LoadoutDetails data={data} />
    </main>
  )
}
