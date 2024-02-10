// components
import ItemSlot from "./ItemSlot"

interface LoadoutDetailsProps {
  data: any
}

interface Slot {
  name: string
  itemId: number
  augments: any[]
}

export default function LoadoutDetails({ data }: LoadoutDetailsProps) {
  return (
    <div className="flex flex-col flex-wrap sm:flex-row mt-4">
      {data.map((slot: Slot) => (
        <div key={slot.name} className="w-screen sm:w-1/2">
          <h2>{slot.name}</h2>
          <ItemSlot itemId={slot.itemId} />
          {slot.augments &&
            slot.augments.map((augment: any, i) => (
              <div key={i} className={`augment-${augment.color.toLowerCase()} bg-black bg-opacity-40 m-2 p-3`}>
                <span className="text-white">{augment.description}</span>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
