// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { StudentNameContext } from "../../../data/providers/providers"
import { sortMapByValue } from "../../../utils/SortUtils"
import { sortMapByWeek } from "../../../utils/DateUtils"
import DefaultText from "../../widgets/mui/DefaultText"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import DefaultSubHeader from "../../widgets/mui/DefaultSubHeader"
import { Box } from "@mui/material"
import { PieChart, PieChartDataGenerator } from "../../widgets/chartjs/PieChart"
import {
  LineChart,
  LineChartDataGenerator,
} from "../../widgets/chartjs/LineChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const OverviewSection: React.FC = () => {
  const { studentSessionGroups } = useContext(SessionsContext)
  const { name: studentName, currentSessionGroup } = useCurrentSessionGroup(
    studentSessionGroups,
    StudentNameContext
  )

  const attendanceData = useMemo(
    () =>
      new Map([
        ["Present", currentSessionGroup.presences()],
        ["Absent", currentSessionGroup.absences()],
      ]),
    [currentSessionGroup]
  )
  const numberOfHours = useMemo(() => {
    return currentSessionGroup.totalHours()
  }, [currentSessionGroup])
  const monthlyReportData = useMemo(
    () => currentSessionGroup.sessionTypeTimes(),
    [studentSessionGroups, studentName]
  )
  const reportViews = useMemo(
    () => [...monthlyReportViewGenerator(sortMapByValue(monthlyReportData))],
    [monthlyReportData]
  )
  const hoursByWeek = useMemo(() => {
    return sortMapByWeek(currentSessionGroup.hoursByWeek())
  }, [currentSessionGroup])

  function* monthlyReportViewGenerator(monthlyReportData: Map<string, number>) {
    let i = 0
    for (const [key, value] of monthlyReportData.entries()) {
      yield (
        <DefaultText key={i}>
          {`${key}: ${(value / 60).toFixed(1)} hours`}
        </DefaultText>
      )
      i++
    }
  }

  return (
    <DefaultGrid direction="column">
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <DefaultSubHeader>Total Service Hours Provided</DefaultSubHeader>
            <>{reportViews}</>
            <DefaultText>Total: {numberOfHours.toFixed(1)} hours</DefaultText>
          </Box>
        </DefaultGridItem>
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
      </DefaultGrid>
      <DefaultGrid direction="row">
        <DefaultGridItem>
          <Box {...CHART_PROPS}>
            <LineChart
              chartTitle="Hours By Week"
              dataGenerator={new LineChartDataGenerator(hoursByWeek, "Hours")}
            />
          </Box>
        </DefaultGridItem>
      </DefaultGrid>
    </DefaultGrid>
  )
}

export default OverviewSection
