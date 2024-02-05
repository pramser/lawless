import { JsonObject } from "@prisma/client/runtime/library"

interface StatsProps {
  stats: JsonObject
}

export default function Stats({ stats }: StatsProps) {
  return (
    <table className="bg-black bg-opacity-40 border-separate border-spacing-2 border border-slate-500 w-auto">
      <tbody>
        {Object.keys(stats).map((key, i) => (
          <tr key={i} className="text-sm">
            <td>{key}</td>
            <td>{stats[key]?.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
