import React from "react"

import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"
import SidebarPages from "./pages"

const BuilderLeftSidebar = () => {
  return (
    <nav className="w-13 fixed left-0 top-0 flex h-screen flex-col items-center justify-start gap-2 border-r border-slate-700 bg-slate-900">
      <SidebarPages />
      <SidebarBlocks />
      <SidebarLayers />
      <SidebarSettings />
    </nav>
  )
}

export default React.memo(BuilderLeftSidebar)
