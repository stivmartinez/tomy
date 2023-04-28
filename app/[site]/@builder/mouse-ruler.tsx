import React, { useEffect, useState } from "react"

const MouseRuler = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: any) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed h-[1px] w-full border-b border-dashed border-neutral-400/40"
        style={{ top: `${mousePosition.y}px` }}
      />
      <div
        className="pointer-events-none fixed h-full w-[1px] border-r border-dashed border-neutral-400/40"
        style={{ left: `${mousePosition.x}px` }}
      />
    </>
  )
}

export default MouseRuler
