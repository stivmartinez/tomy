import React from "react"

/* eslint-disable @next/next/no-img-element */
interface BlockImageProps {
  src: string
  alt: string
  className?: string
}

export default function BlockImage({ src, alt, className }: BlockImageProps) {
  return <img src={src} alt={alt} className={className} />
}
