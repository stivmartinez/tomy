import React from "react"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

interface IconWrapperProps {
  iconName: string
  size?: number
}

const IconWrapper: React.FC<IconWrapperProps> = ({ iconName, size = 16 }) => {
  switch (iconName) {
    case "Facebook":
      return <Facebook size={size} />
    case "Twitter":
      return <Twitter size={size} />
    case "Youtube":
      return <Youtube size={size} />
    case "Instagram":
      return <Instagram size={size} />
    // Add more cases for additional icons as needed
    default:
      return null
  }
}

export default IconWrapper
