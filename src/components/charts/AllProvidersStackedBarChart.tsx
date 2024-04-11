// Copyright 2022 Social Fabric, LLC

import { BarChart } from "../widgets/chartjs/BarChart"
import { randomColor } from "../../utils/Colors"

const GRAPH_TRANSPARENCY = 0.6

type AllProvidersStackedBarChartProps = {
  chartTitle: string
  data: Map<string, Map<string, number>>
}

const AllProvidersStackedBarChart: React.FC<
  AllProvidersStackedBarChartProps
> = ({ chartTitle, data }) => {
  const generatedData = [...dataSetGenerator()]
  const dataSets = generatedData.map((dataSet) => dataSet.dataSet)
  const dataLabels = new Set(...generatedData.map((dataSet) => dataSet.labels))

  function* dataSetGenerator() {
    for (const [providerName, monthData] of data) {
      const color = randomColor(GRAPH_TRANSPARENCY)
      const dataSet = [...monthData.values()]
      yield {
        dataSet: {
          label: providerName,
          data: dataSet,
          backgroundColor: color,
          borderWidth: 1,
        },
        labels: monthData.keys(),
      }
    }
  }

  const noShowChartData = {
    labels: [...dataLabels],
    datasets: dataSets,
  }

  return (
    <>
      <BarChart
        chartTitle={chartTitle}
        chartData={noShowChartData}
        enableLegend={true}
      />
    </>
  )
}

export default AllProvidersStackedBarChart
