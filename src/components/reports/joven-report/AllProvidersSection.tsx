import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { sortMapByValue } from "../../../utils/SortUtils"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import { PieChart, PieChartDataGenerator } from "../../widgets/chartjs/PieChart"
import { BarChart, BarChartDataGenerator } from "../../widgets/chartjs/BarChart"

const AllProvidersSection: React.FC = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const hoursByProvider = useMemo(() => {
    const result = new Map<string, number>()
    for (const sessionGroup of providerSessionGroups) {
      result.set(sessionGroup.name, sessionGroup.totalHours())
    }
    return sortMapByValue(result)
  }, [providerSessionGroups])

  return (
    <DefaultGrid direction="row">
      <DefaultGridItem>
        <PieChart
          chartTitle="Provider Hours"
          dataGenerator={new PieChartDataGenerator(hoursByProvider, "Hours")}
        ></PieChart>
      </DefaultGridItem>
      <DefaultGridItem>
        <BarChart
          chartTitle="Provider Hours"
          dataGenerator={new BarChartDataGenerator(hoursByProvider, "Hours")}
        />
      </DefaultGridItem>
    </DefaultGrid>
  )
}

export default AllProvidersSection
