"use client"

// react
import { useState, useEffect } from "react"
import Link from "next/link"

// components
import Loadout from "./Loadout"
import SortBar from "./SortBar"

// types
import { LOADOUT_SORT_METHODS } from "types"

interface LoadoutListtProps {}

export default function LoadoutList({}: LoadoutListtProps) {
  const [loadouts, setLoadouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/loadouts")
      .then((res) => res.json())
      .then((data) => {
        setLoadouts(data)
        setIsLoading(false)
      })
  }, [])

  const [selectedSortIndex, setSelectedSortIndex] = useState(0)
  let selectedSortMethod = LOADOUT_SORT_METHODS[selectedSortIndex].method

  const selectNextSortMethod = () => {
    var next = selectedSortIndex + 1
    setSelectedSortIndex(next === LOADOUT_SORT_METHODS.length ? 0 : next)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="m-4">
      <SortBar selectedSortName={LOADOUT_SORT_METHODS[selectedSortIndex].name} sortButtonOnClick={selectNextSortMethod}>
        <Link href="/loadouts/new">New Loadout</Link>
      </SortBar>
      <div className="flex flex-row flex-wrap">
        {loadouts.sort(selectedSortMethod).map((loadout: any) => (
          <Loadout key={loadout.id} loadout={loadout} />
        ))}
      </div>
    </section>
  )
}
