/* eslint-disable @next/next/no-img-element */

import React from "react"

import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"

const BuilderNavbar = () => {
  return (
    <div className="h-12 w-full">
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-black">
        <div className="mx-auto flex h-12 w-full max-w-3xl items-center justify-around">
          <SidebarBlocks />
          <SidebarLayers />
          <SidebarSettings />
        </div>
      </div>
    </div>
  )
}

export default React.memo(BuilderNavbar)
