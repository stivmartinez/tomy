import React from "react"

import { Button, ButtonProps } from "@/components/ui/button"

interface BlockButtonProps extends ButtonProps {
  onClick?: () => void
}

export default function BlockButton({
  onClick,
  className,
  ...props
}: BlockButtonProps) {
  return (
    <Button onClick={onClick} className={className} {...props}>
      {props.children}
    </Button>
  )
}
