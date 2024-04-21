import { ChartData } from "chart.js"
import { randomColor } from "../../utils/Colors"

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
