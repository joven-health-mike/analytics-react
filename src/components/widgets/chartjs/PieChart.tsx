import { Chart, ChartData, Legend, Tooltip, ArcElement } from "chart.js"
import { Pie } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

type PieChartProps = {
  chartTitle: string
  chartData: ChartData<"pie", (number | [number, number] | null)[], unknown>
}

export const PieChart: React.FC<PieChartProps> = ({
  chartTitle,
  chartData,
}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{chartTitle}</h2>
      <Pie
        data={chartData}
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
