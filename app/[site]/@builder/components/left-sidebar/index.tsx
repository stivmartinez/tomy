/* eslint-disable @next/next/no-img-element */

import React from "react"

import { Separator } from "@/components/ui/separator"
import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarPages from "./pages"
import SidebarSettings from "./settings"
import { sidebarContainer } from "./styles"

const BuilderLeftSidebar = () => {
  return (
    <nav className={sidebarContainer}>
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
