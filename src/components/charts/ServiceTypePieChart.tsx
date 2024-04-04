// Copyright 2022 Social Fabric, LLC

import { randomColor } from "../../utils/Colors"
import { PieChart } from "../widgets/PieChart"

const GRAPH_TRANSPARENCY = 0.6

type ServiceTypePieChartProps = {
  chartTitle?: string
  hoursByServiceType: Map<string, number>
}

const ServiceTypePieChart: React.FC<ServiceTypePieChartProps> = ({
  chartTitle = "",
  hoursByServiceType,
}) => {
  const labels: string[] = [...hoursByServiceType.keys()]
  const randomColors: string[] = []
  const data: number[] = []
  labels.forEach((serviceType) => {
    randomColors.push(randomColor(GRAPH_TRANSPARENCY))
    data.push(
      parseFloat(((hoursByServiceType.get(serviceType) ?? 0) / 60).toFixed(1))
    )
  })

  const noShowChartData = {
    labels: labels,
    datasets: [
      {
        label: "Hours",
        data: data,
        backgroundColor: randomColors,
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      <PieChart chartTitle={chartTitle} chartData={noShowChartData} />
    </>
  )
}

export default ServiceTypePieChart
