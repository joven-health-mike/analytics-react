import {
  Chart,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
Chart.register(CategoryScale, LinearScale, BarElement, ChartDataLabels)

type BarChartProps = {
  chartTitle: string
  chartData: ChartData<"bar", (number | [number, number] | null)[], unknown>
  enableLegend?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({
  chartTitle,
  chartData,
  enableLegend = false,
}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Bar
        data={chartData}
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
