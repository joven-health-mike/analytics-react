// Copyright 2024 Social Fabric, LLC

import { Box } from "@mui/material"
import {
  LineChart,
  LineChartDataGenerator,
} from "../../widgets/chartjs/LineChart"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import { BarChart, BarChartDataGenerator } from "../../widgets/chartjs/BarChart"
import { PieChart, PieChartDataGenerator } from "../../widgets/chartjs/PieChart"
import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { CustomerNameContext } from "../../../data/providers/providers"
import { sortMapByDayOfWeek, sortMapByWeek } from "../../../utils/DateUtils"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const ChartsSection: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const { currentSessionGroup } = useCurrentSessionGroup(
    customerSessionGroups,
    CustomerNameContext
  )

  const attendanceData = useMemo(
    () =>
      new Map([
        ["Present", currentSessionGroup.presences()],
        ["Absent", currentSessionGroup.absences()],
      ]),

    [currentSessionGroup]
  )
  const absentRateByMonth = useMemo(
    () => currentSessionGroup.noShowRatesByMonth(),
    [currentSessionGroup]
  )
  const hoursByServiceType = useMemo(() => {
    // convert sessionTypeTimes from minutes to hours
    const serviceTypeHours = Array.from(
      currentSessionGroup.sessionTypeTimes().entries()
    ).map(([sessionType, timeInMinutes]) => ({
      sessionType,
      value: parseFloat((timeInMinutes / 60).toFixed(1)),
    }))
    return new Map(
      serviceTypeHours.map(({ sessionType, value }) => [sessionType, value])
    )
  }, [currentSessionGroup])
  const hoursByMonth = useMemo(
    () => currentSessionGroup.hoursByMonth(),
    [currentSessionGroup]
  )
  const hoursByDayOfWeek = useMemo(
    () => sortMapByDayOfWeek(currentSessionGroup.hoursByDayOfWeek()),
    [currentSessionGroup]
  )
  const hoursByWeek = useMemo(
    () => sortMapByWeek(currentSessionGroup.hoursByWeek()),
    [currentSessionGroup]
  )

  return (
    <DefaultGrid direction="column">
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <PieChart
              chartTitle="Hours By Service Type"
              dataGenerator={
                new PieChartDataGenerator(hoursByServiceType, "Hours")
              }
            />
          </Box>
        </DefaultGridItem>
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <LineChart
              chartTitle="Hours By Month"
              dataGenerator={new LineChartDataGenerator(hoursByMonth, "Hours")}
            />
          </Box>
        </DefaultGridItem>
      </DefaultGrid>
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <PieChart
              chartTitle="Attendance"
              dataGenerator={
                new PieChartDataGenerator(attendanceData, "Attendance")
              }
            />
          </Box>
        </DefaultGridItem>
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <LineChart
              chartTitle="Absent Rates By Month"
              dataGenerator={
                new LineChartDataGenerator(absentRateByMonth, "% Absent")
              }
            />
          </Box>
        </DefaultGridItem>
      </DefaultGrid>
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <BarChart
              chartTitle="Hours by Day of Week"
              dataGenerator={
                new BarChartDataGenerator(hoursByDayOfWeek, "Hours")
              }
            />
          </Box>
        </DefaultGridItem>
      </DefaultGrid>
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <LineChart
              chartTitle="Hours by Week"
              dataGenerator={new LineChartDataGenerator(hoursByWeek, "Hours")}
            />
          </Box>
        </DefaultGridItem>
      </DefaultGrid>
    </DefaultGrid>
  )
}

export default ChartsSection
