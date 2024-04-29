// Copyright 2024 Social Fabric, LLC

import React, { useContext, useMemo } from "react"
import { StudentsContext } from "../../pages/DemographicsPage"
import { sortMapByValue } from "../../../utils/SortUtils"
import { PieChart, PieChartDataGenerator } from "../../widgets/chartjs/PieChart"
import DefaultHeader from "../../widgets/mui/DefaultHeader"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"

const OverviewSection: React.FC = () => {
  const students = useContext(StudentsContext)
  const ethnicityMap = useMemo(() => {
    const result = new Map<string, number>()

    students.forEach((student) => {
      const { ethnicity } = student
      const oldMapValue = result.get(ethnicity) ?? 0
      result.set(ethnicity, oldMapValue + 1)
    })

    return sortMapByValue(result)
  }, [students])
  const genderMap = useMemo(() => {
    const result = new Map<string, number>()

    students.forEach((student) => {
      const { gender } = student
      const oldMapValue = result.get(gender) ?? 0
      result.set(gender, oldMapValue + 1)
    })

    return sortMapByValue(result)
  }, [students])
  const gradeLevelMap = useMemo(() => {
    const result = new Map<string, number>()

    students.forEach((student) => {
      const { gradeLevel } = student
      const oldMapValue = result.get(gradeLevel) ?? 0
      result.set(gradeLevel, oldMapValue + 1)
    })

    return sortMapByValue(result)
  }, [students])
  const birthYearMap = useMemo(() => {
    const result = new Map<string, number>()

    students.forEach((student) => {
      const { dateOfBirth } = student
      // TODO: Parse different date formats
      const birthYear = dateOfBirth.split("-")[0]
      const oldMapValue = result.get(birthYear) ?? 0
      result.set(birthYear, oldMapValue + 1)
    })

    return sortMapByValue(result)
  }, [students])

  return (
    <>
      <DefaultHeader>{`Total Number of Students: ${students.length}`}</DefaultHeader>
      <DefaultGrid direction="column">
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <PieChart
              chartTitle="Student Ethnicities"
              dataGenerator={new PieChartDataGenerator(ethnicityMap, "Count")}
            />
          </DefaultGridItem>
          <DefaultGridItem>
            <PieChart
              chartTitle="Student Genders"
              dataGenerator={new PieChartDataGenerator(genderMap, "Count")}
            />
          </DefaultGridItem>
        </DefaultGrid>
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <PieChart
              chartTitle="Student Grade Levels"
              dataGenerator={new PieChartDataGenerator(gradeLevelMap, "Count")}
            />
          </DefaultGridItem>
          <DefaultGridItem>
            <PieChart
              chartTitle="Student Birth Years"
              dataGenerator={new PieChartDataGenerator(birthYearMap, "Count")}
            />
          </DefaultGridItem>
        </DefaultGrid>
      </DefaultGrid>
    </>
  )
}

export default OverviewSection
