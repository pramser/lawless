"use server"

import { prisma } from "db"

export async function GET() {
  const items = await prisma.item.findMany()
  return Response.json(items)
}
