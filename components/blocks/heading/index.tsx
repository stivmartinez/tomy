import React from "react"

interface BlockHeadingProps {
  title: string
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function BlockHeading({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}: BlockHeadingProps) {
  return (
    <>
      <h1 className={titleClassName}>{title}</h1>
      {subtitle && <h2 className={subtitleClassName}>{subtitle}</h2>}
    </>
  )
}
