// Copyright 2024 Social Fabric, LLC

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Line } from "react-chartjs-2"
import { randomColor } from "../../../utils/Colors"
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type LineChartProps = {
  chartTitle: string
  dataGenerator: ILineChartDataGenerator
}

export const LineChart: React.FC<LineChartProps> = ({
  chartTitle,
  dataGenerator,
}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Line
        data={dataGenerator.generateChartData()}
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
            datalabels: {
              color: "#000",
              display: true,
            },
          },
        }}
      />
    </>
  )
}

export interface ILineChartDataGenerator {
  generateChartData(): ChartData<
    "line",
    (number | [number, number] | null)[],
    unknown
  >
}

export class LineChartDataGenerator implements ILineChartDataGenerator {
  constructor(private dataMap: Map<string, number>, private units: string) {}

  generateChartData() {
    return {
      labels: [...this.dataMap.keys()],
      datasets: [
        {
          label: this.units,
          data: [...this.dataMap.values()],
          borderColor: randomColor(1),
          borderWidth: 5,
        },
      ],
    }
  }
}
