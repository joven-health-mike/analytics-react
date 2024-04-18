// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import { Box } from "@mui/material"
import AllHoursStackedBarChart from "../../charts/AllHoursStackedBarChart"
import { sortMapByDayOfWeek, sortMapByWeek } from "../../../utils/DateUtils"
import AllHoursLineChart from "../../charts/AllHoursLineChart"
import AllProvidersStackedBarChart from "../../charts/AllProvidersStackedBarChart"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import DayOfWeekHoursBarChart from "../../charts/DayOfWeekHoursBarChart"
import HoursSection from "./HoursSection"
import StackedHoursSection from "./StackedHoursSection"
import CustomerNoShowSection from "./CustomerNoShowSection"
import ProviderNoShowSection from "./ProviderNoShowSection"
import useGeneratorFactories from "../../hooks/GeneratorFactories"

const PDF_DOWNLOAD_FILENAME = "Joven Health Analytics"

const JovenReport: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const {
    totalHoursGeneratorFactory,
    hoursByWeekGeneratorFactory,
    hoursByDayOfWeekGeneratorFactory,
    allHoursStackedGeneratorFactory,
    allProvidersStackedGeneratorFactory,
  } = useGeneratorFactories()

  return (
    <>
      <Box
        sx={{ m: 2 }}
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
      >
        <Printable docTitle={`${PDF_DOWNLOAD_FILENAME}.pdf`}>
          <DefaultAccordionGroup
            labels={[
              "Total Hours Delivered by Month",
              "Service Hours Delivered by Month",
              "Provider Hours Delivered by Month",
              "No-Show Rates by Customer",
              "No-Show Rates by Provider",
              "Hours by Day of Week",
              "Hours by Week",
            ]}
            nodes={[
              <HoursSection
                sessionGroups={customerSessionGroups}
                dataGeneratorFactory={totalHoursGeneratorFactory}
                chartFactory={(data) => (
                  <AllHoursLineChart
                    chartTitle="Total Hours Delivered by Month"
                    data={data}
                  />
                )}
              />,
              <StackedHoursSection
                sessionGroups={customerSessionGroups}
                dataGeneratorFactory={allHoursStackedGeneratorFactory}
                chartFactory={(data) => (
                  <AllHoursStackedBarChart
                    chartTitle="Service Hours Delivered by Month"
                    data={data}
                  />
                )}
              />,
              <StackedHoursSection
                sessionGroups={customerSessionGroups}
                dataGeneratorFactory={allProvidersStackedGeneratorFactory}
                chartFactory={(data) => (
                  <AllProvidersStackedBarChart
                    chartTitle="Provider Hours Delivered by Month"
                    data={data}
                  />
                )}
              />,
              <CustomerNoShowSection />,
              <ProviderNoShowSection />,
              <HoursSection
                sessionGroups={customerSessionGroups}
                dataGeneratorFactory={hoursByDayOfWeekGeneratorFactory}
                chartFactory={(data) => (
                  <DayOfWeekHoursBarChart
                    chartTitle="Hours by Day of Week"
                    data={sortMapByDayOfWeek(data)}
                  />
                )}
              />,
              <HoursSection
                sessionGroups={customerSessionGroups}
                dataGeneratorFactory={hoursByWeekGeneratorFactory}
                chartFactory={(data) => (
                  <AllHoursLineChart
                    chartTitle="Hours by Week"
                    data={sortMapByWeek(data)}
                  />
                )}
              />,
            ]}
            defaultExpanded={[true, true, true, true, true, true, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
