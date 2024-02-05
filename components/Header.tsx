"use client"

type HeaderParams = {}

export default function Header({}: HeaderParams) {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-900 flex flex-row px-4 py-2 items-center text-white w-fill">
      <span className="cursor-default">lawless.gg</span>
    </header>
  )
}
