import { prisma } from "db"

// revalidate every half hour
export const revalidate = 1800

export async function GET() {
  const items = await prisma.item.findMany({ where: { progress: { not: "REQUESTED" } } })
  return Response.json(items)
}
