// Copyright 2022 Social Fabric, LLC

import { Button } from "@mui/material"
import { ReactNode } from "react"

type DefaultButtonProps = {
  onClick?: () => void
  width?: string
  children?: ReactNode
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: 300,
        backgroundColor: "primary.main",
        color: "#fff",
        ":hover": {
          backgroundColor: "#fff",
          color: "primary.main",
        },
      }}
    >
      {children}
    </Button>
  )
}

export default DefaultButton
