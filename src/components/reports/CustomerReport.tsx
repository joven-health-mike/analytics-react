// Copyright 2022 Social Fabric, LLC

import { useContext, useMemo } from "react"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import DefaultSubHeader from "../widgets/mui/DefaultSubHeader"
import { Box } from "@mui/material"
import DefaultGrid from "../widgets/mui/DefaultGrid"
import DefaultGridItem from "../widgets/mui/DefaultGridItem"
import DefaultAccordionGroup from "../widgets/mui/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import DefaultText from "../widgets/mui/DefaultText"
import ServiceTypePieChart from "../charts/ServiceTypePieChart"
import AllHoursLineChart from "../charts/AllHoursLineChart"
import NoShowPieChart from "../charts/NoShowPieChart"
import NoShowLineChart from "../charts/NoShowLineChart"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { CustomerNameContext } from "../../data/providers/providers"
import DayOfWeekHoursBarChart from "../charts/DayOfWeekHoursBarChart"
import { sortMapByDayOfWeek, sortMapByWeek } from "../../utils/DateUtils"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const CustomerReport: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const { name: customerName, currentSessionGroup } = useCurrentSessionGroup(
    customerSessionGroups,
    CustomerNameContext
  )

  /** Overview Section */
  const OverviewSection: React.FC = () => {
    const numberOfUniqueStudents = useMemo(() => {
      return currentSessionGroup.uniqueStudents()
    }, [currentSessionGroup])
    const numberOfHours = useMemo(() => {
      return currentSessionGroup.totalHours()
    }, [currentSessionGroup])

    return (
      <DefaultGrid direction="column">
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>Total Unique Students Serviced</DefaultSubHeader>
            <DefaultText>{numberOfUniqueStudents}</DefaultText>
          </DefaultGridItem>
          <DefaultGridItem>
            <DefaultSubHeader>Total Service Hours Provided</DefaultSubHeader>
            <DefaultText>{numberOfHours.toFixed(1)}</DefaultText>
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>
              Average Service Hours per Student
            </DefaultSubHeader>
            <DefaultText>{`${(numberOfUniqueStudents === 0
              ? 0
              : numberOfHours / numberOfUniqueStudents
            ).toFixed(1)}`}</DefaultText>
          </DefaultGridItem>
        </DefaultGrid>
      </DefaultGrid>
    )
  }

  /** Charts Section */
  const ChartsSection: React.FC = () => {
    const presences = useMemo(
      () => currentSessionGroup.presences(),
      [currentSessionGroup]
    )
    const absences = useMemo(
      () => currentSessionGroup.absences(),
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
              <ServiceTypePieChart
                chartTitle="Hours By Service Type"
                hoursByServiceType={hoursByServiceType}
              />
            </Box>
          </DefaultGridItem>
          <DefaultGridItem>
            <Box {...CHART_PROPS}>
              <AllHoursLineChart
                chartTitle="Hours By Month"
                data={hoursByMonth}
              />
            </Box>
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <Box {...CHART_PROPS}>
              <NoShowPieChart
                chartTitle="Attendance"
                absences={absences}
                presences={presences}
              />
            </Box>
          </DefaultGridItem>
          <DefaultGridItem>
            <Box {...CHART_PROPS}>
              <NoShowLineChart
                chartTitle="Absent Rates By Month"
                data={absentRateByMonth}
              />
            </Box>
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <Box {...CHART_PROPS}>
              <DayOfWeekHoursBarChart
                chartTitle="Hours by Day of Week"
                data={hoursByDayOfWeek}
              />
            </Box>
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <Box {...CHART_PROPS}>
              <AllHoursLineChart
                chartTitle="Hours by Week"
                data={hoursByWeek}
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
