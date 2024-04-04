// Copyright 2022 Social Fabric, LLC

import { LineChart } from "../widgets/LineChart"
import { randomColor } from "../../utils/Colors"

type NoShowLineChartProps = {
  chartTitle?: string
  data: Map<string, number>
}

const NoShowLineChart: React.FC<NoShowLineChartProps> = ({
  chartTitle = "",
  data,
}) => {
  const noShowChartData = {
    labels: [...data.keys()],
    datasets: [
      {
        label: "No-Show Rate",
        data: [...data.values()],
        borderColor: randomColor(1),
        borderWidth: 5,
      },
    ],
  }
  return (
    <>
      <LineChart chartTitle={chartTitle} chartData={noShowChartData} />
    </>
  )
}

export default NoShowLineChart
