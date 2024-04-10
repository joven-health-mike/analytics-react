// Copyright 2022 Social Fabric, LLC

import { randomColor } from "../../utils/Colors"
import { LineChart } from "../widgets/chartjs/LineChart"

type AllHoursLineChartProps = {
  chartTitle?: string
  data: Map<string, number>
}

const AllHoursLineChart: React.FC<AllHoursLineChartProps> = ({
  chartTitle = "",
  data,
}) => {
  const noShowChartData = {
    labels: [...data.keys()],
    datasets: [
      {
        label: "Hours",
        data: [...data.values()],
        borderColor: randomColor(1),
        borderWidth: 5,
      },
    ],
  }

  return <LineChart chartTitle={chartTitle} chartData={noShowChartData} />
}

export default AllHoursLineChart
