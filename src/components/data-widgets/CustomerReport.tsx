// Copyright 2022 Social Fabric, LLC

import React, { useEffect, useState } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSubHeader from "../widgets/DefaultSubHeader"
import { Box } from "@mui/material"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import DefaultText from "../widgets/DefaultText"
import ServiceTypePieChart from "./charts/ServiceTypePieChart"
import useCurrentCustomerSessionGroup from "../hooks/CurrentCustomerSessionGroup"
import AllHoursLineChart from "./charts/AllHoursLineChart"
import NoShowPieChart from "./charts/NoShowPieChart"
import NoShowLineChart from "./charts/NoShowLineChart"

const CustomerReport: React.FC = () => {
  const { customerName, currentSessionGroup } = useCurrentCustomerSessionGroup()

  /** Overview Section */
  const OverviewSection: React.FC = () => {
    const [numberOfUniqueStudents, setNumberOfUniqueStudents] =
      useState<number>(0)
    const [numberOfHours, setNumberOfHours] = useState<number>(0)

    useEffect(() => {
      setNumberOfUniqueStudents(currentSessionGroup.uniqueStudents())
      setNumberOfHours(currentSessionGroup.totalHours())
    }, [])

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
    const [presences, setPresences] = useState<number>(0)
    const [absences, setAbsences] = useState<number>(0)
    const [absentRateByMonth, setAbsentRateByMonth] = useState<
      Map<string, number>
    >(new Map())
    const [hoursByServiceType, setHoursByServiceType] = useState<
      Map<string, number>
    >(new Map())
    const [hoursByMonth, setHoursByMonth] = useState<Map<string, number>>(
      new Map()
    )

    useEffect(() => {
      setPresences(currentSessionGroup.presences())
      setAbsences(currentSessionGroup.absences())
      setAbsentRateByMonth(currentSessionGroup.noShowRatesByMonth())
      setHoursByServiceType(currentSessionGroup.sessionTypeTimes())
      setHoursByMonth(currentSessionGroup.hoursByMonth())
    }, [])

    return (
      <DefaultGrid direction="column">
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>Hours By Service Type</DefaultSubHeader>
            <ServiceTypePieChart hoursByServiceType={hoursByServiceType} />
          </DefaultGridItem>
          <DefaultGridItem>
            <DefaultSubHeader>Hours By Month</DefaultSubHeader>
            <AllHoursLineChart data={hoursByMonth} />
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>Attendance</DefaultSubHeader>
            <NoShowPieChart absences={absences} presences={presences} />
          </DefaultGridItem>
          <DefaultGridItem>
            <DefaultSubHeader>Absent Rates By Month</DefaultSubHeader>
            <NoShowLineChart data={absentRateByMonth} />
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
