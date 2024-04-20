// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../../widgets/mui/DefaultHeader"
import { Box } from "@mui/material"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { ProviderNameContext } from "../../../data/providers/providers"
import ServiceOverviewSection from "./ServiceOverviewSection"
import AttendanceSection from "./AttendanceSection"
import HoursSection from "./HoursSection"

const ProviderReport: React.FC = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const { name: providerName, currentSessionGroup } = useCurrentSessionGroup(
    providerSessionGroups,
    ProviderNameContext
  )

  return (
    <>
      <Box
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
        sx={{ p: 2 }}
      >
        <Printable docTitle={`Provider Report - ${providerName}`}>
          <DefaultHeader props={{ mt: 0 }}>{providerName}</DefaultHeader>

          <DefaultAccordionGroup
            labels={["Service Overview", "Absence Metrics", "Hours Delivered"]}
            nodes={[
              <ServiceOverviewSection
                currentSessionGroup={currentSessionGroup}
              />,
              <AttendanceSection currentSessionGroup={currentSessionGroup} />,
              <HoursSection currentSessionGroup={currentSessionGroup} />,
            ]}
            defaultExpanded={[false, true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default ProviderReport
