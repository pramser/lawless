"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button className="styled-button mb-2" onClick={() => router.back()}>
      ↩ Back
    </button>
  )
}
