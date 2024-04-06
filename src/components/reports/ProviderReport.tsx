// Copyright 2022 Social Fabric, LLC

import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSubHeader from "../widgets/DefaultSubHeader"
import { Box } from "@mui/material"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import NoShowPieChart from "../charts/NoShowPieChart"
import { formatPercent } from "../../utils/MathUtils"
import NoShowLineChart from "../charts/NoShowLineChart"
import { SessionsContext } from "../../data/providers/SessionProvider"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import { sortMapByValue } from "../../utils/SortUtils"
import { monthOfYearIterator } from "../../utils/DateUtils"
import AllHoursLineChart from "../charts/AllHoursLineChart"
import AllHoursStackedBarChart from "../charts/AllHoursStackedBarChart"
import { createSessionGroups } from "../../data/SessionGroups"
import {
  filterByCustomer as byCustomer,
  filterByType as byType,
} from "../../data/Session"
import Printable from "../widgets/Printable"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { ProviderNameContext } from "../../data/providers/providers"

const CHART_MONTH_OFFSET = 6

const ProviderReport: React.FC = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const { name: providerName, currentSessionGroup } = useCurrentSessionGroup(
    providerSessionGroups,
    ProviderNameContext
  )

  /* ServiceOverviewSection */
  const ServiceOverviewSection: React.FC = () => {
    const [monthlyReportData, setMonthlyReportData] = useState<
      Map<string, number>
    >(new Map())
    const [reportViews, setReportViews] = useState<ReactNode[]>([])

    useEffect(() => {
      setMonthlyReportData(currentSessionGroup.sessionTypeTimes())
    }, [providerSessionGroups, providerName])

    useEffect(() => {
      setReportViews([
        ...monthlyReportViewGenerator(sortMapByValue(monthlyReportData)),
      ])
    }, [monthlyReportData])

    function* monthlyReportViewGenerator(
      monthlyReportData: Map<string, number>
    ) {
      let i = 0
      for (const [key, value] of monthlyReportData.entries()) {
        yield (
          <DefaultSubHeader props={{ mt: 0 }} key={i}>
            {`${key}: ${(value / 60).toFixed(1)} hours`}
          </DefaultSubHeader>
        )
        i++
      }
    }

    return <>{reportViews}</>
  }

  /* AbsencesMetricsSection */
  const AbsencesMetricsSection: React.FC = () => {
    const [presences, setPresences] = useState<number>(0)
    const [absences, setAbsences] = useState<number>(0)

    useEffect(() => {
      setPresences(currentSessionGroup.presences())
      setAbsences(currentSessionGroup.absences())
    }, [currentSessionGroup])

    return (
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <NoShowPieChart
            chartTitle={"Overall No-Show Rate"}
            presences={presences}
            absences={absences}
          />
        </DefaultGridItem>
        <DefaultGridItem>
          <DefaultHeader>
            Total No-Show Rate:{" "}
            {formatPercent(
              presences + absences === 0 ? 0 : absences / (presences + absences)
            )}
          </DefaultHeader>
        </DefaultGridItem>
      </DefaultGrid>
    )
  }

  /* NoShowRatesByMonthSection */
  const NoShowRatesByMonthSection: React.FC = () => {
    return (
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <NoShowLineChart
            chartTitle="No-Show Rate by Month"
            data={currentSessionGroup.noShowRatesByMonth()}
          />
        </DefaultGridItem>
      </DefaultGrid>
    )
  }

  /* NoShowRatesByWeekSection */
  const NoShowRatesByWeekSection: React.FC = () => {
    const [noShowRatesByWeek, setNoShowRatesByWeek] = useState<
      Map<string, number>
    >(new Map())

    useEffect(() => {
      setNoShowRatesByWeek(currentSessionGroup.noShowRatesByWeek())
    }, [currentSessionGroup])

    return (
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <NoShowLineChart
            chartTitle="No-Show Rate by Week"
            data={noShowRatesByWeek}
          />
        </DefaultGridItem>
      </DefaultGrid>
    )
  }

  /* ProviderHoursLineSection */
  const ProviderHoursLineSection: React.FC = () => {
    const [hoursByMonthData, setHoursByMonthData] = useState<
      Map<string, number>
    >(new Map())

    useEffect(() => {
      const newData: Map<string, number> = new Map()

      for (const sessionGroup of providerSessionGroups) {
        if (sessionGroup.name !== providerName) continue
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
    }, [providerSessionGroups, providerName])

    return (
      <AllHoursLineChart
        chartTitle={"Hours Delivered"}
        data={hoursByMonthData}
      />
    )
  }

  /* ProviderHoursStackedSection */
  const ProviderHoursStackedSection: React.FC = () => {
    const providerTypeGroups = useMemo(() => {
      const newProviderTypeGroups = new Map()
      for (const sessionGroup of providerSessionGroups) {
        const providerSessions = [...sessionGroup]
        const typeSessionGroups = createSessionGroups(providerSessions, byType)
        newProviderTypeGroups.set(sessionGroup.name, typeSessionGroups)
      }
      return newProviderTypeGroups
    }, [providerSessionGroups])

    const hoursByServiceData = useMemo(() => {
      const newData: Map<string, Map<string, number>> = new Map()

      const providerTypeGroup = providerTypeGroups.get(providerName)
      if (!providerTypeGroup) return newData

      for (const typeSessionGroup of providerTypeGroup) {
        const monthlyMap = new Map()
        const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
        for (const month of monthGenerator) {
          const hoursForMonth = typeSessionGroup.totalHours(month)
          const newHoursValue = (monthlyMap.get(month) ?? 0) + hoursForMonth
          monthlyMap.set(month, newHoursValue)
        }
        newData.set(typeSessionGroup.name, monthlyMap)
      }
      return newData
    }, [providerName])

    return (
      <AllHoursStackedBarChart
        chartTitle={"Services Delivered"}
        data={hoursByServiceData}
      />
    )
  }

  /* ProviderCustomerStackedSection */
  const ProviderCustomerStackedSection: React.FC = () => {
    const hoursByServiceData = useMemo(() => {
      const newData: Map<string, Map<string, number>> = new Map()

      for (const sessionGroup of providerSessionGroups) {
        if (sessionGroup.name !== providerName) continue
        const providerSessions = [...sessionGroup]

        const customerSessionGroups = createSessionGroups(
          providerSessions,
          byCustomer
        )

        for (const customerSessionGroup of customerSessionGroups) {
          const monthlyMap = new Map()
          const monthGenerator = monthOfYearIterator(CHART_MONTH_OFFSET)
          for (const month of monthGenerator) {
            const hoursForMonth = customerSessionGroup.totalHours(month)
            const newHoursValue = (monthlyMap.get(month) ?? 0) + hoursForMonth
            monthlyMap.set(month, newHoursValue)
          }
          newData.set(customerSessionGroup.name, monthlyMap)
        }
      }
      return newData
    }, [providerSessionGroups, providerName])

    return (
      <AllHoursStackedBarChart
        chartTitle={"Customers Serviced"}
        data={hoursByServiceData}
      />
    )
  }

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
            labels={[
              "Service Overview",
              "Absence Metrics",
              "No-Show Rates by Month",
              "No-Show Rates by Week",
              "Hours Delivered",
              "Services Delivered",
              "Customers Serviced",
            ]}
            nodes={[
              <ServiceOverviewSection />,
              <AbsencesMetricsSection />,
              <NoShowRatesByMonthSection />,
              <NoShowRatesByWeekSection />,
              <ProviderHoursLineSection />,
              <ProviderHoursStackedSection />,
              <ProviderCustomerStackedSection />,
            ]}
            defaultExpanded={[false, true, true, true, true, true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default ProviderReport
