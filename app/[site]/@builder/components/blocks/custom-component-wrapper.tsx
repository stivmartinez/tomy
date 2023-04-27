import React, { useMemo } from "react"
import dynamic from "next/dynamic"

interface CustomComponentWrapperProps {
  componentName: string
  componentPath: string
  onWrapperClick?: any
  [key: string]: any
}

const CustomComponentWrapper: React.FC<CustomComponentWrapperProps> = ({
  componentName,
  componentPath,
  onWrapperClick,
  ...props
}) => {
  const Component = useMemo(
    () => (componentName ? dynamic(() => import(`${componentPath}`)) : null),
    [componentName, componentPath]
  )

  if (!Component) {
    return null
  }

  const handleClick = (event: React.MouseEvent) => {
    if (onWrapperClick) {
      event.stopPropagation()
      onWrapperClick(event)
    }
  }

  return (
    <React.Fragment>
      {React.cloneElement(<Component {...props} />, { onClick: handleClick })}
    </React.Fragment>
  )
}

export default CustomComponentWrapper
