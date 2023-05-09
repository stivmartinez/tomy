import { fetchBody } from "@/lib/api/body"
import BlocksRender from "../blocks-render"

export default async function SitePage() {
  const body = (await fetchBody()).body

  return (
    <>
      <BlocksRender template={body} isEditable={false} />
    </>
  )
}
