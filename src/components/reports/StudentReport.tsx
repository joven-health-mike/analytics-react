// Copyright 2022 Social Fabric, LLC

import React, { useContext, useMemo } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import { Box } from "@mui/material"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../data/providers/SessionProvider"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultSubHeader from "../widgets/DefaultSubHeader"
import DefaultText from "../widgets/DefaultText"
import NoShowPieChart from "../charts/NoShowPieChart"
import { StudentNameContext } from "../../data/providers/providers"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const StudentReport: React.FC = () => {
  const { studentSessionGroups } = useContext(SessionsContext)
  // TODO: What if a student name exists for multiple schools? Or the same name in a particular school?
  const { name: studentName, currentSessionGroup } = useCurrentSessionGroup(
    studentSessionGroups,
    StudentNameContext
  )

  /** Overview Section */
  const OverviewSection: React.FC = () => {
    const presences = useMemo(() => {
      return currentSessionGroup.presences()
    }, [currentSessionGroup])
    const absences = useMemo(() => {
      return currentSessionGroup.absences()
    }, [currentSessionGroup])
    const numberOfHours = useMemo(() => {
      return currentSessionGroup.totalHours()
    }, [currentSessionGroup])

    return (
      <DefaultGrid direction="column">
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
              <DefaultSubHeader>Total Service Hours Provided</DefaultSubHeader>
              <DefaultText>{numberOfHours.toFixed(1)} hours</DefaultText>
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
