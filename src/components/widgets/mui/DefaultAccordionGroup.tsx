// Copyright 2022 Social Fabric, LLC

import { ReactNode } from "react"
import DefaultAccordion from "./DefaultAccordion"
import { Paper } from "@mui/material"

type DefaultAccordionGroupProps = {
  nodes: ReactNode[]
  labels: string[]
  defaultExpanded?: boolean[]
}

const DefaultAccordionGroup: React.FC<DefaultAccordionGroupProps> = ({
  nodes,
  labels,
  defaultExpanded,
}) => {
  return (
    <>
      {nodes.map(
        (node, index) =>
          node && (
            <DefaultAccordion
              key={index}
              label={labels[index]}
              defaultExpanded={defaultExpanded ? defaultExpanded[index] : false}
            >
              <Paper elevation={4}>{node}</Paper>
            </DefaultAccordion>
          )
      )}
    </>
  )
}

export default DefaultAccordionGroup
