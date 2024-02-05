import Item from "@/Item"
import { prisma } from "db"

// revalidate every hour
export const revalidate = 3600

export default async function Home() {
  const items = await prisma.item.findMany()

  return (
    <main className="flex flex-row flex-wrap min-h-screen m-4">
      {items.map((item: any) => (
        <Item key={item.id} item={item} />
      ))}
    </main>
  )
}
