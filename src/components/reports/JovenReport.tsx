// Copyright 2022 Social Fabric, LLC

import { useContext, useEffect, useState } from "react"
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

const CHART_MONTH_OFFSET = 6
const PDF_DOWNLOAD_FILENAME = "Joven Health Analytics"

const JovenReport: React.FC = () => {
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

type AllHoursLineSectionProps = {
  label: string
}

const AllHoursLineSection: React.FC<AllHoursLineSectionProps> = ({ label }) => {
  const { typeSessionGroups: filteredTypeSessionGroups } =
    useContext(SessionsContext)
  const [hoursByMonthData, setHoursByMonthData] = useState<Map<string, number>>(
    new Map()
  )

  useEffect(() => {
    if (!filteredTypeSessionGroups) {
      setHoursByMonthData(new Map())
      return
    }

    const newData: Map<string, number> = new Map()

    for (const sessionGroup of filteredTypeSessionGroups) {
      const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
      for (const month of monthGenerator) {
        const hoursForMonth = sessionGroup.totalHours(month)
        const newHoursValue = (newData.get(month) ?? 0) + hoursForMonth
        newData.set(month, newHoursValue)
      }
    }

    // round all values after adding them up. reduces error
    for (const [key, value] of newData.entries()) {
      newData.set(key, parseFloat(value.toFixed(1)))
    }

    setHoursByMonthData(newData)
  }, [filteredTypeSessionGroups])

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
  const { typeSessionGroups: filteredTypeSessionGroups } =
    useContext(SessionsContext)
  const [hoursByServiceData, setHoursByServiceData] = useState<
    Map<string, Map<string, number>>
  >(new Map())

  useEffect(() => {
    if (!filteredTypeSessionGroups) {
      setHoursByServiceData(new Map())
      return
    }

    const newData: Map<string, Map<string, number>> = new Map()

    for (const sessionGroup of filteredTypeSessionGroups) {
      const monthlyMap = new Map()
      const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
      for (const month of monthGenerator) {
        const hoursForMonth = sessionGroup.totalHours(month)
        const newHoursValue = (monthlyMap.get(month) ?? 0) + hoursForMonth
        monthlyMap.set(month, newHoursValue)
      }
      newData.set(sessionGroup.name, monthlyMap)
    }

    setHoursByServiceData(newData)
  }, [filteredTypeSessionGroups])

  return (
    <>
      {hoursByServiceData && (
        <AllHoursStackedBarChart chartTitle={label} data={hoursByServiceData} />
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
  const [hoursByProviderData, setHoursByProviderData] = useState<
    Map<string, Map<string, number>>
  >(new Map())
  const { providerSessionGroups: filteredProviderSessionGroups } =
    useContext(SessionsContext)

  useEffect(() => {
    if (!filteredProviderSessionGroups) {
      setHoursByProviderData(new Map())
      return
    }
    // TODO: For any provider who has less than 10 hours/month, bundle them into an "Other" category
    const newData: Map<string, Map<string, number>> = new Map()

    for (const sessionGroup of filteredProviderSessionGroups) {
      const monthlyMap = new Map()
      const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
      for (const month of monthGenerator) {
        const hoursForMonth = sessionGroup.totalHours(month)
        const newHoursValue = (monthlyMap.get(month) ?? 0) + hoursForMonth
        monthlyMap.set(month, newHoursValue)
      }
      newData.set(sessionGroup.name, monthlyMap)
    }

    setHoursByProviderData(newData)
  }, [filteredProviderSessionGroups])

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
  const { customerSessionGroups: filteredCustomerSessionGroups } =
    useContext(SessionsContext)
  const [customerNoShowData, setCustomerNoShowData] =
    useState<Map<string, number>>()

  useEffect(() => {
    if (!filteredCustomerSessionGroups) {
      setCustomerNoShowData(new Map())
      return
    }

    const customerAbsentRates = new Map<string, number>()

    for (const sessionGroup of filteredCustomerSessionGroups) {
      // filter out customers with 0 absent rate
      if (sessionGroup.absentRate() > 0) {
        customerAbsentRates.set(sessionGroup.name, sessionGroup.absentRate())
      }
    }

    setCustomerNoShowData(sortMapByValue(customerAbsentRates))
  }, [filteredCustomerSessionGroups])

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
  const { providerSessionGroups: filteredProviderSessionGroups } =
    useContext(SessionsContext)
  const [providerNoShowData, setProviderNoShowData] =
    useState<Map<string, number>>()

  useEffect(() => {
    if (!filteredProviderSessionGroups) {
      setProviderNoShowData(new Map())
      return
    }

    const providerAbsentRates = new Map<string, number>()

    for (const sessionGroup of filteredProviderSessionGroups) {
      // filter out customers with 0 absent rate
      if (sessionGroup.absentRate() > 0) {
        providerAbsentRates.set(sessionGroup.name, sessionGroup.absentRate())
      }
    }

    setProviderNoShowData(sortMapByValue(providerAbsentRates))
  }, [filteredProviderSessionGroups])

  return (
    <>
      {providerNoShowData && (
        <NoShowChart chartTitle={label} data={providerNoShowData} />
      )}
    </>
  )
}

export default JovenReport
