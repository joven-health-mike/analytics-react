// Copyright 2022 Social Fabric, LLC

import { randomColor } from "../../utils/Colors"
import { PieChart } from "../widgets/chartjs/PieChart"

const GRAPH_TRANSPARENCY = 0.6

type ServiceTypePieChartProps = {
  chartTitle?: string
  hoursByServiceType: Map<string, number>
}

const ServiceTypePieChart: React.FC<ServiceTypePieChartProps> = ({
  chartTitle = "",
  hoursByServiceType,
}) => {
  const generatedData = [...dataGenerator()]
  const labels = generatedData.map((dataSet) => dataSet.label)
  const data = generatedData.map((dataSet) => dataSet.data)
  const randomColors = generatedData.map((dataSet) => dataSet.color)

  function* dataGenerator() {
    for (const [serviceType, hours] of hoursByServiceType) {
      yield {
        data: hours,
        label: serviceType,
        color: randomColor(GRAPH_TRANSPARENCY),
      }
    }
  }

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
