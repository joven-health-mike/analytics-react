// Copyright 2022 Social Fabric, LLC

import { Grid, GridDirection } from "@mui/material"
import { ReactNode } from "react"

type DefaultGridProps = {
  direction?: GridDirection | undefined
  children?: ReactNode
}

const DefaultGrid: React.FC<DefaultGridProps> = ({
  direction = "column",
  children,
}) => {
  return (
    <>
      <Grid container direction={direction} sx={{ p: 1 }}>
        {children}
      </Grid>
    </>
  )
}

export default DefaultGrid
