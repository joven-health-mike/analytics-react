import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { sortMapByValue } from "../../../utils/SortUtils"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import ServiceTypePieChart from "../../charts/ServiceTypePieChart"
import NoShowChart from "../../charts/NoShowChart"

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
        <ServiceTypePieChart
          chartTitle="Customer Hours"
          hoursByServiceType={hoursByCustomer}
        ></ServiceTypePieChart>
      </DefaultGridItem>
      <DefaultGridItem>
        <NoShowChart chartTitle="Customer Hours" data={hoursByCustomer} />
      </DefaultGridItem>
    </DefaultGrid>
  )
}

export default AllCustomersSection
