// components
import SetList from "@/SetList"

// revalidate every hour
export const revalidate = 3600

export default async function Sets() {
  return <SetList />
}
