import { useContext, useMemo } from "react"
import { generateAbsentRates } from "../../../data/generators/AttendanceGenerator"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { sortMapByValue } from "../../../utils/SortUtils"
import { Box } from "@mui/material"
import NoShowChart from "../../charts/NoShowChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const ProviderNoShowSection: React.FC = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const providerNoShowData = useMemo(() => {
    const providerAbsentRates = new Map<string, number>()

    for (const { sessionGroup, absentRate } of generateAbsentRates(
      providerSessionGroups
    )) {
      providerAbsentRates.set(sessionGroup.name, absentRate)
    }

    return sortMapByValue(providerAbsentRates)
  }, [providerSessionGroups])

  return (
    <>
      {providerNoShowData && (
        <Box {...CHART_PROPS}>
          <NoShowChart
            chartTitle={"No-Show Rates by Provider"}
            data={providerNoShowData}
          />
        </Box>
      )}
    </>
  )
}

export default ProviderNoShowSection
