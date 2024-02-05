"use client"

type SortBarParams = {
  selectedSortName: string
  sortButtonOnClick: any
}

export default function SortBar({ selectedSortName, sortButtonOnClick }: SortBarParams) {
  return (
    <div className="bg-white bg-opacity-10 flex flex-row px-4 py-2 items-center text-white w-fill">
      &nbsp;
      <span className="cursor-default">{selectedSortName}</span>
      <button
        className="bg-indigo-900 hover:bg-blue-700 border border-white rounded-md ml-4 px-2 py-1"
        onClick={sortButtonOnClick}
      >
        sort
      </button>
    </div>
  )
}
