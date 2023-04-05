import { fetchBody } from "@/lib/api/body"
import BlocksRender from "@/components/blocksRender"

export default async function Home() {
  // Get API response
  const response = await fetchBody()
  const body = response.body
  return <BlocksRender template={body} />
}
