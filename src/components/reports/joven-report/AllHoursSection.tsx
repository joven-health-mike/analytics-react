import { useContext, useMemo, useState } from "react"
import SessionGroups from "../../../data/models/SessionGroups"
import { Box, Paper } from "@mui/material"
import useGeneratorFactories from "../../hooks/GeneratorFactories"
import SessionGroup from "../../../data/models/SessionGroup"
import AllHoursStackedBarChart from "../../charts/AllHoursStackedBarChart"
import AllProvidersStackedBarChart from "../../charts/AllProvidersStackedBarChart"
import { sortMapByWeek } from "../../../utils/DateUtils"
import DefaultToggleButton from "../../widgets/mui/DefaultToggleButton"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { LineChartDataGenerator } from "../../charts/IChartDataGenerator"
import { LineChart } from "../../widgets/chartjs/LineChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

type AllHoursSectionProps = {
  sessionGroups: SessionGroups
}

const AllHoursSection: React.FC<AllHoursSectionProps> = ({ sessionGroups }) => {
  const { customerSessionGroups, providerSessionGroups } =
    useContext(SessionsContext)
  const [timeFrameSelection, setTimeFrameSelection] = useState<
    "Week" | "Month"
  >("Week")
  const [chartSelection, setChartSelection] = useState<
    "Service Types" | "Providers" | "Customers"
  >("Service Types")
  const {
    totalHoursGeneratorFactory,
    hoursByWeekGeneratorFactory,
    allHoursStackedGeneratorFactory,
    allProvidersStackedGeneratorFactory,
    allCustomersStackedGeneratorFactory,
  } = useGeneratorFactories(
    sessionGroups,
    providerSessionGroups,
    customerSessionGroups
  )

  return (
    <>
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box sx={{ p: 5 }} textAlign={"center"}>
          <DefaultToggleButton
            selectionOptions={["Week", "Month"]}
            onSelectionChanged={(selection) =>
              setTimeFrameSelection(selection as "Week" | "Month")
            }
          />
        </Box>
        {timeFrameSelection === "Week" && (
          <HoursSubsection
            sessionGroups={sessionGroups}
            dataGeneratorFactory={hoursByWeekGeneratorFactory}
            chartFactory={(data) => (
              <LineChart
                chartTitle="Hours by Week"
                dataGenerator={
                  new LineChartDataGenerator(sortMapByWeek(data), "Hours")
                }
              />
            )}
          />
        )}
        {timeFrameSelection === "Month" && (
          <HoursSubsection
            sessionGroups={sessionGroups}
            dataGeneratorFactory={totalHoursGeneratorFactory}
            chartFactory={(data) => (
              <LineChart
                chartTitle="Hours by Month"
                dataGenerator={new LineChartDataGenerator(data, "Hours")}
              />
            )}
          />
        )}
      </Paper>
      <Paper elevation={4} sx={{ p: 2 }}>
        <Box sx={{ p: 5 }} textAlign={"center"}>
          <DefaultToggleButton
            selectionOptions={["Service Types", "Providers", "Customers"]}
            onSelectionChanged={(selection) =>
              setChartSelection(
                selection as "Service Types" | "Providers" | "Customers"
              )
            }
          />
        </Box>
        {chartSelection === "Service Types" && (
          <StackedHoursSubsection
            sessionGroups={sessionGroups}
            dataGeneratorFactory={allHoursStackedGeneratorFactory}
            chartFactory={(data) => (
              <AllHoursStackedBarChart chartTitle="Service Hours" data={data} />
            )}
          />
        )}
        {chartSelection === "Providers" && (
          <StackedHoursSubsection
            sessionGroups={sessionGroups}
            dataGeneratorFactory={allProvidersStackedGeneratorFactory}
            chartFactory={(data) => (
              <AllProvidersStackedBarChart
                chartTitle="Provider Hours"
                data={data}
              />
            )}
          />
        )}
        {chartSelection === "Customers" && (
          <StackedHoursSubsection
            sessionGroups={sessionGroups}
            dataGeneratorFactory={allCustomersStackedGeneratorFactory}
            chartFactory={(data) => (
              <AllProvidersStackedBarChart
                chartTitle="Customer Hours"
                data={data}
              />
            )}
          />
        )}
      </Paper>
    </>
  )
}

type HoursSubsectionProps = {
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

const HoursSubsection: React.FC<HoursSubsectionProps> = ({
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

type StackedHoursSubsectionProps = {
  sessionGroups: SessionGroups
  dataGeneratorFactory: () => Generator<
    { sessionGroup: SessionGroup; hoursData: Map<string, number> },
    void,
    unknown
  >
  chartFactory: (data: Map<string, Map<string, number>>) => JSX.Element
}

const StackedHoursSubsection: React.FC<StackedHoursSubsectionProps> = ({
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

export default AllHoursSection
