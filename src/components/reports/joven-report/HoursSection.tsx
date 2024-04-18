import { useMemo } from "react"
import SessionGroups from "../../../data/models/SessionGroups"
import { Box } from "@mui/material"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

type HoursSectionProps = {
  sessionGroups: SessionGroups
  dataGeneratorFactory: () => Generator<
    {
      timeFrame: string
      hoursForTimeFrame: number
    },
    void,
    unknown
  >
  chartFactory: (data: Map<string, number>) => JSX.Element
}

const HoursSection: React.FC<HoursSectionProps> = ({
  sessionGroups,
  dataGeneratorFactory,
  chartFactory,
}) => {
  const hoursData = useMemo(() => {
    const newData: Map<string, number> = new Map()

    for (const { timeFrame, hoursForTimeFrame } of dataGeneratorFactory()) {
      const newHoursValue = (newData.get(timeFrame) ?? 0) + hoursForTimeFrame
      newData.set(timeFrame, newHoursValue)
    }

    // round all values after adding them up. reduces error
    for (const [key, value] of newData.entries()) {
      newData.set(key, parseFloat(value.toFixed(1)))
    }

    return newData
  }, [sessionGroups])

  return <Box {...CHART_PROPS}>{chartFactory(hoursData)}</Box>
}

export default HoursSection
