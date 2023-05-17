/* eslint-disable @next/next/no-img-element */

import React from "react"

import SidebarBlocks from "./blocks"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"
import { navbarContainer } from "./styles"

const BuilderNavbar = () => {
  return (
    <nav className={navbarContainer}>
      <SidebarBlocks />
      <SidebarLayers />
      <SidebarSettings />
    </nav>
  )
}

export default React.memo(BuilderNavbar)
