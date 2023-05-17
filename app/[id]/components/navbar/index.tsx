/* eslint-disable @next/next/no-img-element */

import React from "react"

import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"

const BuilderNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-around border-t border-white/10 bg-black">
      <SidebarBlocks />
      <SidebarLayers />
      <SidebarSettings />
    </div>
  )
}

export default React.memo(BuilderNavbar)
