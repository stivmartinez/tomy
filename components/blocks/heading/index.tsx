import { cn } from "@/lib/utils"
import React from "react"

interface BlockHeadingProps {
  title: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export default function BlockHeading({
  title,
  className,
  tag = "h1",
}: BlockHeadingProps) {
  const TitleTag = tag

  const defaultClassName = cn("my-3 text-3xl font-bold", className)

  return <TitleTag className={defaultClassName}>{title}</TitleTag>
}
