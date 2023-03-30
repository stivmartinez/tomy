import { fetchHome } from "@/api/home"

import { processApiResponse } from "@/lib/processApiResponse"
import BlocksRender from "@/components/blocksRender"

export default async function Home() {
  // Get API response
  const response = await fetchHome()
  const { body, data } = await processApiResponse(response)

  return <BlocksRender template={body} data={data} />
}
