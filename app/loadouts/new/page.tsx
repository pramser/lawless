// next
import { Oswald } from "next/font/google"

// db
import { ItemSubType, Manufacturer } from "@prisma/client"

// components
import DetailPageHeading from "@/DetailPageHeading"

// revalidate every hour
export const revalidate = 3600

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default async function NewLoadout() {
  return (
    <main className="flex flex-col flex-wrap min-h-screen m-4">
      <DetailPageHeading>New Loadout Request</DetailPageHeading>
    </main>
  )
}
