import React from "react"
import dynamic from "next/dynamic"

import IconWrapper from "@/components/shared/icon-wrapper"

interface SocialItemProps {
  id: string
  name: string
  icon: string
  type: string
  className?: string
  props: {
    href: string
    target: string
    rel: string
    children?: React.ReactNode
  }
}

interface BlockSocialProps {
  items: SocialItemProps[]
  iconLibrary?: Record<string, string>
}

const BlockSocial: React.FC<BlockSocialProps> = ({ items }) => {
  return (
    <>
      {items.map((item: SocialItemProps) => {
        const Tag = item.type as keyof JSX.IntrinsicElements

        return (
          <Tag key={item.id} className={item.className} {...item.props}>
            <IconWrapper iconName={item.icon} size={12} />
            {item.props.children}
          </Tag>
        )
      })}
    </>
  )
}

export default BlockSocial
