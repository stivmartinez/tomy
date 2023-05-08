import React from "react"

import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"
import SidebarPages from "./pages"
import { Separator } from "@/components/ui/separator"

const BuilderLeftSidebar = () => {
  return (
    <nav className="w-13 fixed left-0 top-0 flex h-screen flex-col items-center justify-start border-r border-white/20 bg-black">
      <SidebarPages />
      <Separator className="bg-white/20" />
      <SidebarBlocks />
      <SidebarLayers />
      <Separator className="bg-white/20" />
      <SidebarSettings />
    </nav>
  )
}

export default React.memo(BuilderLeftSidebar)
