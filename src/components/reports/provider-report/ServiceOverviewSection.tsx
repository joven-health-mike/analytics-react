import { ReactNode, useEffect, useState } from "react"
import { sortMapByValue } from "../../../utils/SortUtils"
import DefaultSubHeader from "../../widgets/mui/DefaultSubHeader"
import { Box } from "@mui/material"
import SessionGroup from "../../../data/models/SessionGroup"

type ServiceOverviewSectionProps = {
  currentSessionGroup: SessionGroup
}

const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({
  currentSessionGroup,
}) => {
  const [monthlyReportData, setMonthlyReportData] = useState<
    Map<string, number>
  >(new Map())
  const [reportViews, setReportViews] = useState<ReactNode[]>([])

  useEffect(() => {
    setMonthlyReportData(currentSessionGroup.sessionTypeTimes())
  }, [currentSessionGroup])

  useEffect(() => {
    setReportViews([
      ...monthlyReportViewGenerator(sortMapByValue(monthlyReportData)),
    ])
  }, [monthlyReportData])

  function* monthlyReportViewGenerator(monthlyReportData: Map<string, number>) {
    let i = 0
    for (const [key, value] of monthlyReportData.entries()) {
      yield (
        <DefaultSubHeader props={{ mt: 0 }} key={i}>
          {`${key}: ${(value / 60).toFixed(1)} hours`}
        </DefaultSubHeader>
      )
      i++
    }
  }

  return <Box sx={{ p: 3 }}>{reportViews}</Box>
}

export default ServiceOverviewSection
