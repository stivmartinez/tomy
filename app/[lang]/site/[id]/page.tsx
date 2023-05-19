import { getPages } from "@/lib/api/get-pages"
import BlocksRender from "../../blocks-render"

export default async function BuilderPage() {
  const pages = await getPages()

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      {pages[0].structure.map((block: any, i: any) => {
        return <BlocksRender key={i} template={block} isEditable={false} />
      })}
    </div>
  )
}
