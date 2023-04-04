import React from "react";

/* eslint-disable @next/next/no-img-element */
interface BlockLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BlockLogo({ src, alt, className }: BlockLogoProps) {
  return <img src={src} alt={alt} className={className} />;
}
