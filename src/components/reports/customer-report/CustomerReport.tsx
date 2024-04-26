// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../../widgets/mui/DefaultHeader"
import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { CustomerNameContext } from "../../../data/providers/providers"
import OverviewSection from "./OverviewSection"
import ChartsSection from "./ChartsSection"

const CustomerReport: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const { name: customerName } = useCurrentSessionGroup(
    customerSessionGroups,
    CustomerNameContext
  )

  return (
    <>
      <Box
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
        sx={{ p: 2 }}
      >
        <Printable docTitle={`Customer Report - ${customerName}`}>
          <DefaultHeader props={{ mt: 0 }}>{customerName}</DefaultHeader>
          <DefaultAccordionGroup
            labels={["Service Overview", "Charts"]}
            nodes={[<OverviewSection />, <ChartsSection />]}
            defaultExpanded={[true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default CustomerReport
