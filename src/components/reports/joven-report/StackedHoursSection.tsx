import { useMemo } from "react"
import SessionGroups from "../../../data/models/SessionGroups"
import { Box } from "@mui/material"
import SessionGroup from "../../../data/models/SessionGroup"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

type StackedHoursSectionProps = {
  sessionGroups: SessionGroups
  dataGeneratorFactory: () => Generator<
    { sessionGroup: SessionGroup; hoursData: Map<string, number> },
    void,
    unknown
  >
  chartFactory: (data: Map<string, Map<string, number>>) => JSX.Element
}

const StackedHoursSection: React.FC<StackedHoursSectionProps> = ({
  sessionGroups,
  dataGeneratorFactory,
  chartFactory,
}) => {
  const hoursData = useMemo(() => {
    const newData: Map<string, Map<string, number>> = new Map()

    for (const { sessionGroup, hoursData } of dataGeneratorFactory()) {
      newData.set(sessionGroup.name, hoursData)
    }

    return newData
  }, [sessionGroups])

  return <Box {...CHART_PROPS}>{chartFactory(hoursData)}</Box>
}

export default StackedHoursSection
