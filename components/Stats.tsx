interface StatsProps {
  stats: any
}

export default function Stats({ stats }: StatsProps) {
  return (
    <table className="bg-black bg-opacity-40 border-separate border-spacing-2 border border-slate-500 w-auto">
      <tbody>
        {Object.keys(stats).map((key, i) => (
          <tr key={i} className="text-sm">
            <td className="uppercase">{key.replace(/_/g, " ")}</td>
            <td>{stats[key]?.toString().replace(",", "-")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
