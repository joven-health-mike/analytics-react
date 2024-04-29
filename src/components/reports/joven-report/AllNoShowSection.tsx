// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo, useState } from "react"
import { Box, Paper } from "@mui/material"
import DefaultToggleButton from "../../widgets/mui/DefaultToggleButton"
import SessionGroups from "../../../data/models/SessionGroups"
import { generateAbsentRates } from "../../../data/generators/AttendanceGenerator"
import { sortMapByValue } from "../../../utils/SortUtils"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { BarChart, BarChartDataGenerator } from "../../widgets/chartjs/BarChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const AllNoShowSection: React.FC = () => {
  const { providerSessionGroups, customerSessionGroups } =
    useContext(SessionsContext)
  const [chartSelection, setChartSelection] = useState<
    "Providers" | "Customers"
  >("Providers")

  return (
    <>
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box sx={{ p: 5 }} textAlign={"center"}>
          <DefaultToggleButton
            selectionOptions={["Providers", "Customers"]}
            onSelectionChanged={(selection) =>
              setChartSelection(selection as "Providers" | "Customers")
            }
          />
        </Box>
        {chartSelection === "Providers" && (
          <NoShowSection
            sessionGroups={providerSessionGroups}
            chartTitle="Absent Rates by Provider"
          />
        )}
        {chartSelection === "Customers" && (
          <NoShowSection
            sessionGroups={customerSessionGroups}
            chartTitle="Absent Rates by Customer"
          />
        )}
      </Paper>
    </>
  )
}

type NoShowSectionProps = {
  sessionGroups: SessionGroups
  chartTitle: string
}

const NoShowSection: React.FC<NoShowSectionProps> = ({
  sessionGroups,
  chartTitle,
}) => {
  const noShowData = useMemo(() => {
    const absentRates = new Map<string, number>()

    for (const { sessionGroup, absentRate } of generateAbsentRates(
      sessionGroups
    )) {
      absentRates.set(sessionGroup.name, absentRate)
    }

    return sortMapByValue(absentRates)
  }, [sessionGroups])

  return (
    <>
      {noShowData && (
        <Box {...CHART_PROPS}>
          <BarChart
            chartTitle={chartTitle}
            dataGenerator={new BarChartDataGenerator(noShowData, "Attendance")}
          />
        </Box>
      )}
    </>
  )
}

export default AllNoShowSection
