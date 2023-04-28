import { useDrag, useDrop } from "react-dnd"

export const LayerItem = ({
  block,
  selectedBlockId,
  setSelectedBlockId,
  level,
  moveBlock,
}: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "layerItem",
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "layerItem",
    drop: (item) => moveBlock(item.id, block.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`font-semibold ${
        isOver
          ? "bg-green-100"
          : selectedBlockId === block.id
          ? "text-red-500"
          : ""
      }`}
      style={{ marginLeft: `${level * 8}px`, opacity: isDragging ? 0.5 : 1 }}
      onClick={() => setSelectedBlockId(block.id)}
    >
      {block.type}: {block.id}
    </div>
  )
}
