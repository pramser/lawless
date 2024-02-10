import { Progress } from "@prisma/client"
import { prisma } from "db"

// revalidate every half hour
export const revalidate = 1800

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const isRequested = searchParams.get("isRequested")
  const notIn = isRequested === "true" ? [Progress.IDENTIFIED, Progress.IN_REVIEW, Progress.COMPLETE] : [Progress.REQUESTED]
  const items = await prisma.loadout.findMany({ where: { progress: { notIn } } })
  return Response.json(items)
}
