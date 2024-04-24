// Copyright 2022 Social Fabric, LLC

import React, { useContext, useMemo } from "react"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import { Box } from "@mui/material"
import DefaultAccordionGroup from "../widgets/mui/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../data/providers/SessionProvider"
import DefaultGrid from "../widgets/mui/DefaultGrid"
import DefaultGridItem from "../widgets/mui/DefaultGridItem"
import DefaultSubHeader from "../widgets/mui/DefaultSubHeader"
import DefaultText from "../widgets/mui/DefaultText"
import { StudentNameContext } from "../../data/providers/providers"
import { sortMapByValue } from "../../utils/SortUtils"
import { sortMapByWeek } from "../../utils/DateUtils"
import { LineChart, LineChartDataGenerator } from "../widgets/chartjs/LineChart"
import { PieChart, PieChartDataGenerator } from "../widgets/chartjs/PieChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const StudentReport: React.FC = () => {
  const { studentSessionGroups } = useContext(SessionsContext)
  // TODO: What if a student name exists for multiple schools? Or the same name in a particular school?
  // TODO: List out every session the student attended
  const { name: studentName, currentSessionGroup } = useCurrentSessionGroup(
    studentSessionGroups,
    StudentNameContext
  )

  /** Overview Section */
  const OverviewSection: React.FC = () => {
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

    function* monthlyReportViewGenerator(
      monthlyReportData: Map<string, number>
    ) {
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

  return (
    <>
      <Box
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
        sx={{ p: 2 }}
      >
        <Printable docTitle={`Student Report - ${studentName}`}>
          <DefaultHeader props={{ mt: 0 }}>{studentName}</DefaultHeader>
          <DefaultAccordionGroup
            labels={["Overview of Joven Health Services"]}
            nodes={[<OverviewSection />]}
            defaultExpanded={[true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default StudentReport
