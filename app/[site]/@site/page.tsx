import { fetchBody } from "@/lib/api/body"
import { fetchFooter } from "@/lib/api/footer"
import { fetchHeader } from "@/lib/api/header"

import BlocksRender from "../blocks-render"

export default async function SitePage() {
  const header = (await fetchHeader()).header
  const body = (await fetchBody()).body
  const footer = (await fetchFooter()).footer

  return (
    <>
      <BlocksRender template={header} isEditable={false} />
      <BlocksRender template={body} isEditable={false} />
      <BlocksRender template={footer} isEditable={false} />
    </>
  )
}
