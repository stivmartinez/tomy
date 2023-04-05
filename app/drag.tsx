"use client"

import React, { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { v4 as uuidv4 } from "uuid"

interface ButtonData {
  id: string
  original_id?: string
  tag: "p"
  className: string
  content: string
}

interface RowData {
  id: string
  tag: "main"
  className: string
  children: ButtonData[]
}

type RowType = "header" | "body" | "footer"

const buttonData: ButtonData[] = [
  {
    id: uuidv4(),
    tag: "p",
    className: "text-sm",
    content: "Button 1",
  },
  {
    id: uuidv4(),
    tag: "p",
    className: "text-sm",
    content: "Button 2",
  },
  {
    id: uuidv4(),
    tag: "p",
    className: "text-sm",
    content: "Button 3",
  },
  {
    id: uuidv4(),
    tag: "p",
    className: "text-sm",
    content: "Button 4",
  },
]

const initialRowData: Record<RowType, RowData> = {
  header: {
    id: "header",
    tag: "main",
    className: "w-full bg-white",
    children: [],
  },
  body: {
    id: "body",
    tag: "main",
    className: "w-full bg-white",
    children: [],
  },
  footer: {
    id: "footer",
    tag: "main",
    className: "w-full bg-white",
    children: [],
  },
}

const DraggableButton = ({
  data,
  index, // Add index prop
  moveButton,
}: {
  data: ButtonData
  index?: number // Add index prop
  moveButton?: (dragId: string, hoverId: string) => void
}) => {
  const [, drag, preview] = useDrag(() => ({
    type: "button",
    item: data,
  }))

  const [, drop] = useDrop(() => ({
    accept: "button",
    hover: (item: any, monitor: any) => {
      if (!moveButton) return

      const updatedItem = monitor.getItem() // Get the updated item with the new index value
      const dragIndex = updatedItem.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveButton(dragIndex, hoverIndex)
      updatedItem.index = hoverIndex // Update the index value of the dragged item
    },
  }))

  const ref = (node: any) => {
    drag(node)
    drop(node)
    preview(node)
  }

  return (
    <button ref={ref} className="m-2 bg-blue-500 p-2 text-white">
      {data.content}
    </button>
  )
}

const DroppableRow = ({
  rowType,
  rowData,
  onDrop,
}: {
  rowType: RowType
  rowData: RowData
  onDrop: (rowType: RowType, item: ButtonData, hoverId?: string) => void
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item: any) => onDrop(rowType, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const moveButton = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = rowData.children[dragIndex]
    onDrop(rowType, draggedItem, hoverIndex) // Pass hoverIndex as atIndex
  }

  return (
    <div
      ref={drop}
      className={`h-48 w-full border ${
        isOver ? "bg-green-100" : "bg-gray-200"
      }`}
    >
      {rowData.children
        .filter((child) => child !== undefined)
        .map((child, index) => (
          <DraggableButton
            key={child.id}
            data={child}
            index={index}
            moveButton={moveButton}
          />
        ))}
    </div>
  )
}

const DragAndDrop = () => {
  const [rows, setRows] = useState(initialRowData)

  const handleDrop = (rowType: RowType, item: ButtonData, atIndex?: number) => {
    if (!item) return

    // Create a new button object with a unique ID and original_id as a reference to the original ID
    const newItem = { ...item, id: uuidv4(), original_id: item.id }

    setRows((prevState) => {
      // Remove the item from its original row
      const updatedRows = { ...prevState }
      for (const key in updatedRows) {
        const index = updatedRows[key as RowType].children.findIndex(
          (child) => child && child.original_id === item.original_id
        )
        if (index > -1) {
          updatedRows[key as RowType].children.splice(index, 1)
          break
        }
      }

      // Add the newItem to the target row
      const newRowData = {
        ...updatedRows[rowType],
        children: [...updatedRows[rowType].children],
      }

      if (typeof atIndex === "number") {
        newRowData.children.splice(atIndex, 0, newItem) // Use atIndex value
      } else {
        newRowData.children.push(newItem)
      }

      return {
        ...updatedRows,
        [rowType]: newRowData,
      }
    })
  }

  console.log(rows)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        {buttonData.map((data, index) => (
          <DraggableButton key={data.id} data={data} index={index} />
        ))}
        <div className="mt-4 flex w-full flex-col space-y-4">
          {(["header", "body", "footer"] as RowType[]).map((rowType) => (
            <DroppableRow
              key={rowType}
              rowType={rowType}
              rowData={rows[rowType]}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

export default DragAndDrop
