// Copyright 2024 Social Fabric, LLC

import { Typography } from "@mui/material"
import { ReactNode } from "react"

type NavBarTextProps = {
  children: ReactNode
}

const NavBarText: React.FC<NavBarTextProps> = ({ children }) => {
  return <Typography color={"secondary"}>{children}</Typography>
}

export default NavBarText
