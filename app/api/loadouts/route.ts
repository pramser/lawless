import { prisma } from "db"

// revalidate every half hour
export const revalidate = 1800

export async function GET() {
  const items = await prisma.loadout.findMany({ where: { itemProgress: { not: "REQUESTED" } } })
  return Response.json(items)
}
