// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSubHeader from "../widgets/DefaultSubHeader"
import { Box } from "@mui/material"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import DefaultText from "../widgets/DefaultText"
import ServiceTypePieChart from "./charts/ServiceTypePieChart"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { CustomerNameContext } from "../pages/CustomerReportPage"

const CustomerReport: React.FC = () => {
  const { currentSessionGroup } = useCurrentSessionGroup()
  const customerName = useContext(CustomerNameContext)

  const OverviewSection: React.FC = () => {
    const [numberOfUniqueStudents, setNumberOfUniqueStudents] =
      useState<number>(0)
    const [numberOfHours, setNumberOfHours] = useState<number>(0)
    const [absentRate, setAbsentRate] = useState<number>(0)

    useEffect(() => {
      setNumberOfUniqueStudents(currentSessionGroup.uniqueStudents())
      setNumberOfHours(currentSessionGroup.totalHours())
      setAbsentRate(currentSessionGroup.absentRate())
    }, [])

    return (
      <DefaultGrid direction="column">
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>Unique Students Serviced</DefaultSubHeader>
            <DefaultText>{numberOfUniqueStudents}</DefaultText>
          </DefaultGridItem>
          <DefaultGridItem>
            <DefaultSubHeader>Total Hours Delivered</DefaultSubHeader>
            <DefaultText>{numberOfHours}</DefaultText>
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <DefaultSubHeader>% Absent Rate</DefaultSubHeader>
            <DefaultText>{`${absentRate}%`}</DefaultText>
          </DefaultGridItem>
        </DefaultGrid>
      </DefaultGrid>
    )
  }

  const ChartsSection: React.FC = () => {
    const [hoursByServiceType, setHoursByServiceType] = useState<
      Map<string, number>
    >(new Map())

    useEffect(() => {
      setHoursByServiceType(currentSessionGroup.sessionTypeTimes())
    }, [])

    return (
      <DefaultGrid direction="column">
        <DefaultGridItem>
          <DefaultSubHeader>Hours By Service Type</DefaultSubHeader>
          <ServiceTypePieChart hoursByServiceType={hoursByServiceType} />
        </DefaultGridItem>
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
