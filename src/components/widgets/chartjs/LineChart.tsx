import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Line } from "react-chartjs-2"
import { ILineChartDataGenerator } from "../../charts/IChartDataGenerator"
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
