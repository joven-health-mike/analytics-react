// Copyright 2024 Social Fabric, LLC

import { Chart, ChartData, Legend, Tooltip, ArcElement } from "chart.js"
import { Pie } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { randomColor } from "../../../utils/Colors"
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

type PieChartProps = {
  chartTitle: string
  dataGenerator: IPieChartDataGenerator
}

export const PieChart: React.FC<PieChartProps> = ({
  chartTitle,
  dataGenerator,
}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Pie
        data={dataGenerator.generateChartData()}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: true,
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

export interface IPieChartDataGenerator {
  generateChartData(): ChartData<
    "pie",
    (number | [number, number] | null)[],
    unknown
  >
}

export class PieChartDataGenerator implements IPieChartDataGenerator {
  constructor(private dataMap: Map<string, number>, private units: string) {}

  generateChartData() {
    const randomColors = Array.from(this.dataMap.keys()).map(() =>
      randomColor(0.6)
    )
    return {
      labels: [...this.dataMap.keys()],
      datasets: [
        {
          label: this.units,
          data: [...this.dataMap.values()],
          backgroundColor: randomColors,
          borderWidth: 2,
        },
      ],
    }
  }
}
