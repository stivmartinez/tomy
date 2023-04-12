"use client"

import React, { useState } from "react"

import ClientBlocksRender from "@/components/ClientBlocksRender"

interface CustomPageProps {}

const CustomPage: React.FC<CustomPageProps> = () => {
  const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

  const [structure, setStructure] = useState([])

  const addChildToStructure = (parentId: string, blockConfiguration: any) => {
    const newStructure = JSON.parse(JSON.stringify(structure))

    const newBlock = {
      ...blockConfiguration,
      id: generateRandomId(),
      children: [],
    }

    const addChildRecursive = (node: any) => {
      if (!node) return false
      if (node.id === parentId) {
        node.children.push(newBlock)
        return true
      }
      if (node.children) {
        for (const child of node.children) {
          if (addChildRecursive(child)) {
            return true
          }
        }
      }
      return false
    }

    newStructure.forEach((node: any) => {
      addChildRecursive(node)
    })

    setStructure(newStructure)
  }

  const addBlock = (parentId: string, blockType: string) => {
    let blockConfig

    switch (blockType) {
      case "row":
        blockConfig = {
          tag: "div",
          className:
            "w-full max-w-6xl mx-auto flex flex-row border-2 border-blue-500 min-h-16",
          content: "",
        }
        break
      case "column":
        blockConfig = {
          tag: "div",
          className:
            "w-full max-w-6xl mx-auto flex flex-col border-2 border-orange-500 min-h-16",
          content: "",
        }
        break
      case "heading": // Add this case
        blockConfig = {
          tag: "h1",
          className: "text-4xl font-bold",
          content: "Example",
        }
        break
      case "paragraph": // Add this case
        blockConfig = {
          tag: "p",
          className: "text-base",
          content: "Example",
        }
        break
      case "logo": // Add this case
        blockConfig = {
          tag: "div",
          componentName: "BlockLogo",
          className: "w-[180px]",
          props: {
            src: "/logo.svg",
            alt: "logo",
            className: "w-full h-auto",
          },
        }
        break
      default:
        return
    }

    addChildToStructure(parentId, blockConfig)
  }

  return (
    <>
      {structure.map((block) => (
        <ClientBlocksRender
          key={block.id}
          template={block}
          setStructure={setStructure}
          level={0}
          addChild={addChildToStructure}
          addBlock={addBlock} // Add this line
        />
      ))}
      <button
        onClick={() => {
          const id = generateRandomId()
          const newBlock = {
            id,
            tag: "div",
            className: "py-12 w-full border-2 border-red-500",
            children: [],
            content: id,
          }
          setStructure((prevStructure: any[]) => [...prevStructure, newBlock])
        }}
      >
        Add child to header
      </button>
    </>
  )
}

export default CustomPage
