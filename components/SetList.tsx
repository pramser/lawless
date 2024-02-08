"use client"

// react
import { useState, useEffect } from "react"

// components
import Set from "./Set"
import SortBar from "./SortBar"

// types
import { SORT_METHODS } from "types"

interface SetListtProps {}

export default function SetList({}: SetListtProps) {
  const [sets, setSets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/sets")
      .then((res) => res.json())
      .then((data) => {
        setSets(data)
        setIsLoading(false)
      })
  }, [])

  const [selectedSortIndex, setSelectedSortIndex] = useState(0)
  let selectedSortMethod = SORT_METHODS[selectedSortIndex].method

  const selectNextSortMethod = () => {
    var next = selectedSortIndex + 1
    setSelectedSortIndex(next === SORT_METHODS.length ? 0 : next)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="m-4">
      <SortBar selectedSortName={SORT_METHODS[selectedSortIndex].name} sortButtonOnClick={selectNextSortMethod} />
      <div className="flex flex-row flex-wrap">
        {sets.sort(selectedSortMethod).map((set: any) => (
          <Set key={set.id} set={set} />
        ))}
      </div>
    </section>
  )
}
