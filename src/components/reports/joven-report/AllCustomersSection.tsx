// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { sortMapByValue } from "../../../utils/SortUtils"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import { PieChart, PieChartDataGenerator } from "../../widgets/chartjs/PieChart"
import { BarChart, BarChartDataGenerator } from "../../widgets/chartjs/BarChart"

const AllCustomersSection: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const hoursByCustomer = useMemo(() => {
    const result = new Map<string, number>()
    for (const sessionGroup of customerSessionGroups) {
      result.set(sessionGroup.name, sessionGroup.totalHours())
    }
    return sortMapByValue(result)
  }, [customerSessionGroups])

  return (
    <DefaultGrid direction="row">
      <DefaultGridItem>
        <PieChart
          chartTitle="Customer Hours"
          dataGenerator={new PieChartDataGenerator(hoursByCustomer, "Hours")}
        ></PieChart>
      </DefaultGridItem>
      <DefaultGridItem>
        <BarChart
          chartTitle="Customer Hours"
          dataGenerator={new BarChartDataGenerator(hoursByCustomer, "Hours")}
        />
      </DefaultGridItem>
    </DefaultGrid>
  )
}

export default AllCustomersSection
