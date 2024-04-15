// Copyright 2022 Social Fabric, LLC

import { BarChart } from "../widgets/chartjs/BarChart"
import { randomColor } from "../../utils/Colors"

const GRAPH_TRANSPARENCY = 0.6

type DayOfWeekHoursBarChartProps = {
  chartTitle: string
  data: Map<string, number>
}

const DayOfWeekHoursBarChart: React.FC<DayOfWeekHoursBarChartProps> = ({
  chartTitle,
  data,
}) => {
  const dayOfWeekChartData = {
    labels: [...data.keys()],
    datasets: [
      {
        label: "Hours",
        data: [...data.values()],
        backgroundColor: randomColor(GRAPH_TRANSPARENCY),
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <BarChart
        chartTitle={chartTitle}
        chartData={dayOfWeekChartData}
        enableLegend={false}
      />
    </>
  )
}

export default DayOfWeekHoursBarChart
