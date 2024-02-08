"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white py-1 px-2 mb-4 rounded-sm w-24"
      onClick={() => router.back()}
    >
      ↩ Back
    </button>
  )
}
