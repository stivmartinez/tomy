import { fetchSingle } from "@/api/single"

import { processApiResponse } from "@/lib/processApiResponse"
import BlocksRender from "@/components/blocksRender"

export default async function Single({ params }: { params: { slug: string } }) {
  // Get API response
  const response = await fetchSingle()
  const { body, data } = await processApiResponse(
    response,
    params.slug,
    "single"
  )

  return <BlocksRender template={body} data={data} />
}
