import { useContext, useMemo } from "react"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import DefaultSubHeader from "../../widgets/mui/DefaultSubHeader"
import DefaultText from "../../widgets/mui/DefaultText"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { CustomerNameContext } from "../../../data/providers/providers"

const OverviewSection: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const { currentSessionGroup } = useCurrentSessionGroup(
    customerSessionGroups,
    CustomerNameContext
  )
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
          <DefaultSubHeader>Average Service Hours per Student</DefaultSubHeader>
          <DefaultText>{`${(numberOfUniqueStudents === 0
            ? 0
            : numberOfHours / numberOfUniqueStudents
          ).toFixed(1)}`}</DefaultText>
        </DefaultGridItem>
      </DefaultGrid>
    </DefaultGrid>
  )
}

export default OverviewSection
