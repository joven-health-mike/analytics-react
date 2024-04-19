// Copyright 2022 Social Fabric, LLC

import { Grid } from "@mui/material"
import { ReactNode } from "react"

type DefaultGridItemProps = {
  children?: ReactNode
}

const DefaultGridItem: React.FC<DefaultGridItemProps> = ({ children }) => {
  return (
    <>
      <Grid
        item
        textAlign={"center"}
        xs={true}
        sm={true}
        md={true}
        lg={true}
        xl={true}
        sx={{ p: 1 }}
      >
        {children}
      </Grid>
    </>
  )
}

export default DefaultGridItem
