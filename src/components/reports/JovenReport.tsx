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

  function* generateHoursByMonthData() {
    for (const sessionGroup of typeSessionGroups) {
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

  type AllHoursLineSectionProps = {
    label: string
  }

  const AllHoursLineSection: React.FC<AllHoursLineSectionProps> = ({
    label,
  }) => {
    const hoursByMonthData = useMemo(() => {
      const newData: Map<string, number> = new Map()

      for (const { month, hoursForMonth } of generateHoursByMonthData()) {
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
          <AllHoursLineChart chartTitle={label} data={hoursByMonthData} />
        )}
      </>
    )
  }

  type AllHoursStackedSectionProps = {
    label: string
  }

  const AllHoursStackedSection: React.FC<AllHoursStackedSectionProps> = ({
    label,
  }) => {
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
            chartTitle={label}
            data={hoursByServiceData}
          />
        )}
      </>
    )
  }

  type HoursByProviderSectionProps = {
    label: string
  }

  const HoursByProviderSection: React.FC<HoursByProviderSectionProps> = ({
    label,
  }) => {
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
            chartTitle={label}
            data={hoursByProviderData}
          />
        )}
      </>
    )
  }

  type CustomerNoShowSectionProps = {
    label: string
  }

  const CustomerNoShowSection: React.FC<CustomerNoShowSectionProps> = ({
    label,
  }) => {
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
          <NoShowChart chartTitle={label} data={customerNoShowData} />
        )}
      </>
    )
  }

  type ProviderNoShowSectionProps = {
    label: string
  }

  const ProviderNoShowSection: React.FC<ProviderNoShowSectionProps> = ({
    label,
  }) => {
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
          <NoShowChart chartTitle={label} data={providerNoShowData} />
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
              <AllHoursLineSection label={"Total Hours Delivered by Month"} />,
              <AllHoursStackedSection
                label={"Service Hours Delivered by Month"}
              />,
              <HoursByProviderSection
                label={"Provider Hours Delivered by Month"}
              />,
              <CustomerNoShowSection label={"No-Show Rates by Customer"} />,
              <ProviderNoShowSection label={"No-Show Rates by Provider"} />,
            ]}
            defaultExpanded={[true, true, true, true, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
