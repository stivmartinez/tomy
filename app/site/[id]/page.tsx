import { getPages } from "@/lib/api/get-pages"
import BlocksRender from "../../[lang]/blocks-render"

export default async function SitePage() {
  const pages = await getPages()
  const structure = pages.data.pages[0].structure

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      {structure.map((block: any) => (
        <BlocksRender key={block.id} template={block} isEditable={false} />
      ))}
    </div>
  )
}
