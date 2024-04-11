// Copyright 2022 Social Fabric, LLC

import { BarChart } from "../widgets/chartjs/BarChart"
import { randomColor } from "../../utils/Colors"

const GRAPH_TRANSPARENCY = 0.6

type NoShowChartProps = {
  chartTitle: string
  data: Map<string, number>
}

const NoShowChart: React.FC<NoShowChartProps> = ({ chartTitle, data }) => {
  const randomColors: string[] = Array.from({ length: data.size }).map(() =>
    randomColor(GRAPH_TRANSPARENCY)
  )
  const noShowChartData = {
    labels: [...data.keys()],
    datasets: [
      {
        label: "No-Show Rate",
        data: [...data.values()],
        backgroundColor: randomColors,
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <BarChart chartTitle={chartTitle} chartData={noShowChartData} />
    </>
  )
}

export default NoShowChart
