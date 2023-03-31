import { fetchSingle } from "@/api/single"
import { fetchTaxonomy } from "@/api/taxonomy"
import BlocksRender from "@/components/blocksRender"
import { processApiResponse } from "@/lib/processApiResponse"

export default async function Single({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string }
}) {
  let response, body, data

  const conditional = params.slug.length > 1

  if (conditional) {
    response = await fetchTaxonomy()
    const result = await processApiResponse(
      response,
      params.slug,
      "taxonomy",
      searchParams
    )
    body = result.body
    data = result.data
  } else {
    response = await fetchSingle()
    const result = await processApiResponse(
      response,
      params.slug,
      "single",
      searchParams
    )
    body = result.body
    data = result.data
  }

  return <BlocksRender template={body} data={data} />
}
