import { fetchSingle } from "@/api/single"
import { fetchTaxonomy } from "@/api/taxonomy"
import BlocksRender from "@/components/blocksRender"
import { processApiResponse } from "@/lib/processApiResponse"

export default async function Single({ params }: { params: { slug: string } }) {
  let response, body, data

  // Fetch single data
  response = await fetchSingle()
  const { body: bodySingle, data: dataSingle } = await processApiResponse(
    response,
    params.slug,
    "single"
  )

  const single = dataSingle?.wordpress?.posts?.single
  const hasSingleData = single && Array.isArray(single) && single.length > 0

  if (hasSingleData) {
    body = bodySingle
    data = dataSingle
  } else {
    // Fetch taxonomy data
    response = await fetchTaxonomy()
    const { body: bodyTax, data: dataTax } = await processApiResponse(
      response,
      params.slug
    )

    body = bodyTax
    data = dataTax
  }

  return <BlocksRender template={body} data={data} />
}
