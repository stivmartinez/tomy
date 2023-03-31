import { fetchSingle } from "@/api/single"
import { fetchTaxonomy } from "@/api/taxonomy"

import { processApiResponse } from "@/lib/processApiResponse"
import BlocksRender from "@/components/blocksRender"

export default async function Single({ params }: { params: { slug: string } }) {
  let response, body, data

  const conditional = params.slug.length > 1

  if (conditional) {
    response = await fetchTaxonomy()
    const result = await processApiResponse(response, params.slug)
    body = result.body
    data = result.data
  } else {
    response = await fetchSingle()
    const result = await processApiResponse(response, params.slug, "single")
    body = result.body
    data = result.data
  }

  return <BlocksRender template={body} data={data} />
}
