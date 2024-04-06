// Copyright 2022 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { Box } from "@mui/material"
import NoShowChart from "../charts/NoShowChart"
import { sortMapByValue } from "../../utils/SortUtils"
import AllHoursStackedBarChart from "../charts/AllHoursStackedBarChart"
import { monthOfYearIterator } from "../../utils/DateUtils"
import AllHoursLineChart from "../charts/AllHoursLineChart"
import AllProvidersStackedBarChart from "../charts/AllProvidersStackedBarChart"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import { SessionsContext } from "../../data/providers/SessionProvider"
import SessionGroups from "../../data/SessionGroups"

const CHART_MONTH_OFFSET = 6
const PDF_DOWNLOAD_FILENAME = "Joven Health Analytics"

const JovenReport: React.FC = () => {
  const { customerSessionGroups, providerSessionGroups, typeSessionGroups } =
    useContext(SessionsContext)

  function* generateHoursByMonthData(sessionGroups: SessionGroups) {
    for (const sessionGroup of sessionGroups) {
      const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
      for (const month of monthGenerator) {
        const hoursForMonth = sessionGroup.totalHours(month)
        yield { month, hoursForMonth }
      }
    }
  }

  function* generateMonthlyMapData(sessionGroups: SessionGroups) {
    // TODO: For any session group that has less than 10 hours/month, bundle them into an "Other" category
    for (const sessionGroup of sessionGroups) {
      const monthlyMap = new Map()
      const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
      for (const month of monthGenerator) {
        const hoursForMonth = sessionGroup.totalHours(month)
        const newHoursValue = (monthlyMap.get(month) ?? 0) + hoursForMonth
        monthlyMap.set(month, newHoursValue)
      }
      yield { sessionGroup, monthlyMap }
    }
  }

  function* generateAbsentRates(sessionGroups: SessionGroups) {
    for (const sessionGroup of sessionGroups) {
      // filter out customers with 0 absent rate
      if (sessionGroup.absentRate() > 0) {
        yield { sessionGroup, absentRate: sessionGroup.absentRate() }
      }
    }
  }

  /* AllHoursLineSection */
  const AllHoursLineSection: React.FC = () => {
    const hoursByMonthData = useMemo(() => {
      const newData: Map<string, number> = new Map()

      for (const { month, hoursForMonth } of generateHoursByMonthData(
        typeSessionGroups
      )) {
        const newHoursValue = (newData.get(month) ?? 0) + hoursForMonth
        newData.set(month, newHoursValue)
      }

      // round all values after adding them up. reduces error
      for (const [key, value] of newData.entries()) {
        newData.set(key, parseFloat(value.toFixed(1)))
      }

      return newData
    }, [typeSessionGroups])

    return (
      <>
        {hoursByMonthData && (
          <AllHoursLineChart
            chartTitle={"Total Hours Delivered by Month"}
            data={hoursByMonthData}
          />
        )}
      </>
    )
  }

  /* AllHoursStackedSection */
  const AllHoursStackedSection: React.FC = () => {
    const hoursByServiceData = useMemo(() => {
      const newData: Map<string, Map<string, number>> = new Map()

      for (const { sessionGroup, monthlyMap } of generateMonthlyMapData(
        typeSessionGroups
      )) {
        newData.set(sessionGroup.name, monthlyMap)
      }

      return newData
    }, [typeSessionGroups])

    return (
      <>
        {hoursByServiceData && (
          <AllHoursStackedBarChart
            chartTitle={"Service Hours Delivered by Month"}
            data={hoursByServiceData}
          />
        )}
      </>
    )
  }

  /* HoursByProviderSection */
  const HoursByProviderSection: React.FC = () => {
    const hoursByProviderData = useMemo(() => {
      const newData: Map<string, Map<string, number>> = new Map()

      for (const { sessionGroup, monthlyMap } of generateMonthlyMapData(
        providerSessionGroups
      )) {
        newData.set(sessionGroup.name, monthlyMap)
      }

      return newData
    }, [providerSessionGroups])

    return (
      <>
        {hoursByProviderData && (
          <AllProvidersStackedBarChart
            chartTitle={"Provider Hours Delivered by Month"}
            data={hoursByProviderData}
          />
        )}
      </>
    )
  }

  /* CustomerNoShowSection */
  const CustomerNoShowSection: React.FC = () => {
    const customerNoShowData = useMemo(() => {
      const customerAbsentRates = new Map<string, number>()

      for (const { sessionGroup, absentRate } of generateAbsentRates(
        customerSessionGroups
      )) {
        customerAbsentRates.set(sessionGroup.name, absentRate)
      }

      return sortMapByValue(customerAbsentRates)
    }, [customerSessionGroups])

    return (
      <>
        {customerNoShowData && (
          <NoShowChart
            chartTitle={"No-Show Rates by Customer"}
            data={customerNoShowData}
          />
        )}
      </>
    )
  }

  /* ProviderNoShowSection */
  const ProviderNoShowSection: React.FC = () => {
    const providerNoShowData = useMemo(() => {
      const providerAbsentRates = new Map<string, number>()

      for (const { sessionGroup, absentRate } of generateAbsentRates(
        providerSessionGroups
      )) {
        providerAbsentRates.set(sessionGroup.name, absentRate)
      }

      return sortMapByValue(providerAbsentRates)
    }, [providerSessionGroups])

    return (
      <>
        {providerNoShowData && (
          <NoShowChart
            chartTitle={"No-Show Rates by Provider"}
            data={providerNoShowData}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Box
        sx={{ m: 2 }}
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
      >
        <Printable docTitle={`${PDF_DOWNLOAD_FILENAME}.pdf`}>
          <DefaultAccordionGroup
            labels={[
              "Total Hours Delivered by Month",
              "Service Hours Delivered by Month",
              "Provider Hours Delivered by Month",
              "No-Show Rates by Customer",
              "No-Show Rates by Provider",
            ]}
            nodes={[
              <AllHoursLineSection />,
              <AllHoursStackedSection />,
              <HoursByProviderSection />,
              <CustomerNoShowSection />,
              <ProviderNoShowSection />,
            ]}
            defaultExpanded={[true, true, true, true, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
