import * as React from "react"
import style from "./Text.style"
import classNames from "classnames"
import { TextProps } from "./type"

const Text: React.FC<TextProps> = ({
  children,
  color,
  variant = "p",
  className = "",
  role = "primary",
  truncate = false,
  onClick = () => null,
}) => {
  const CustomTag = variant

  const textStyle = classNames(
    `${style.tag[variant]} ${style.role[role]} ${style.color[color]} ${className}`,
    {
      "!truncate": truncate,
    }
  )

  return (
    <CustomTag className={textStyle} onClick={onClick}>
      {children}
    </CustomTag>
  )
}

export default Text
