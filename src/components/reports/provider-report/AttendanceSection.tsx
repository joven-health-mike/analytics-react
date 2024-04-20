import { useEffect, useState } from "react"
import SessionGroup from "../../../data/models/SessionGroup"
import DefaultGrid from "../../widgets/mui/DefaultGrid"
import DefaultGridItem from "../../widgets/mui/DefaultGridItem"
import NoShowPieChart from "../../charts/NoShowPieChart"
import DefaultHeader from "../../widgets/mui/DefaultHeader"
import { formatPercent } from "../../../utils/MathUtils"
import { Box } from "@mui/material"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

type AttendanceSectionProps = {
  currentSessionGroup: SessionGroup
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({
  currentSessionGroup,
}) => {
  const [presences, setPresences] = useState<number>(0)
  const [absences, setAbsences] = useState<number>(0)

  useEffect(() => {
    setPresences(currentSessionGroup.presences())
    setAbsences(currentSessionGroup.absences())
  }, [currentSessionGroup])

  return (
    <DefaultGrid direction="row">
      <DefaultGridItem>
        <Box {...CHART_PROPS}>
          <NoShowPieChart
            chartTitle={"Attendance"}
            presences={presences}
            absences={absences}
          />
        </Box>
      </DefaultGridItem>
      <DefaultGridItem>
        <Box {...CHART_PROPS}>
          <DefaultHeader>
            Total Absent Rate:{" "}
            {formatPercent(
              presences + absences === 0 ? 0 : absences / (presences + absences)
            )}
          </DefaultHeader>
        </Box>
      </DefaultGridItem>
    </DefaultGrid>
  )
}

export default AttendanceSection
