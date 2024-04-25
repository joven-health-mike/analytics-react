import {
  Chart,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { randomColor } from "../../../utils/Colors"
Chart.register(CategoryScale, LinearScale, BarElement, ChartDataLabels)

type BarChartProps = {
  chartTitle: string
  dataGenerator: IBarChartDataGenerator
  enableLegend?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({
  chartTitle,
  dataGenerator,
  enableLegend = false,
}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Bar
        data={dataGenerator.generateChartData()}
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: enableLegend,
            },
            datalabels: {
              color: "#000",
              display: true,
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </>
  )
}

export interface IBarChartDataGenerator {
  generateChartData(): ChartData<
    "bar",
    (number | [number, number] | null)[],
    unknown
  >
}

export class BarChartDataGenerator implements IBarChartDataGenerator {
  constructor(private dataMap: Map<string, number>, private units: string) {}

  generateChartData() {
    return {
      labels: [...this.dataMap.keys()],
      datasets: [
        {
          label: this.units,
          data: [...this.dataMap.values()],
          backgroundColor: Array.from({
            length: this.dataMap.size,
          }).map(() => randomColor(0.6)),
          borderWidth: 1,
        },
      ],
    }
  }
}

export class StackedBarChartDataGenerator implements IBarChartDataGenerator {
  constructor(private dataMap: Map<string, Map<string, number>>) {}

  generateChartData() {
    const generatedData = [...dataSetGenerator(this.dataMap)]
    const dataSets = generatedData.map((dataSet) => dataSet.dataSet)
    const dataLabels = new Set(
      ...generatedData.map((dataSet) => dataSet.labels)
    )

    function* dataSetGenerator(dataMap: Map<string, Map<string, number>>) {
      for (const [serviceName, monthData] of dataMap) {
        const color = randomColor(0.6)
        const dataSet = [...monthData.values()]
        yield {
          dataSet: {
            label: serviceName,
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
    return noShowChartData
  }
}
