"use client"

import React, { useEffect, useState } from "react"

import BlocksRender from "../@builder/components/blocks/blocks-render"

interface SiteProps {
  initialData?: any[]
}

const Site: React.FC<SiteProps> = ({ initialData = [] }) => {
  const [structure, setStructure] = useState<any[]>(initialData)

  const loadSavedStructure = () => {
    const savedStructure = localStorage.getItem("savedStructure")
    if (savedStructure) {
      setStructure(JSON.parse(savedStructure))
    } else {
      setStructure(initialData)
    }
  }

  useEffect(() => {
    loadSavedStructure()
  }, [])

  return (
    <>
      {structure.map((block, index) => (
        <BlocksRender key={index} template={block} isEditable={false} />
      ))}
    </>
  )
}

export default Site
