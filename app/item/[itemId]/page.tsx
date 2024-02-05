import { prisma } from "db"

export default async function ItemDetail({ params: { itemId } }: any) {
  const item = await prisma.item.findFirstOrThrow({ where: { id: parseInt(itemId) } })
  return <main className="flex flex-col flex-wrap min-h-screen m-4">{item?.name}</main>
}
