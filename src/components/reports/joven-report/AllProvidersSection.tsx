import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { sortMapByValue } from "../../../utils/SortUtils"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import ServiceTypePieChart from "../../charts/ServiceTypePieChart"
import NoShowChart from "../../charts/NoShowChart"

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
        <ServiceTypePieChart
          chartTitle="Provider Hours"
          hoursByServiceType={hoursByProvider}
        ></ServiceTypePieChart>
      </DefaultGridItem>
      <DefaultGridItem>
        <NoShowChart chartTitle="Provider Hours" data={hoursByProvider} />
      </DefaultGridItem>
    </DefaultGrid>
  )
}

export default AllProvidersSection
