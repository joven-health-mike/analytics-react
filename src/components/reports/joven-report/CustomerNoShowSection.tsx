import { useContext, useMemo } from "react"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { generateAbsentRates } from "../../../data/generators/AttendanceGenerator"
import { sortMapByValue } from "../../../utils/SortUtils"
import { Box } from "@mui/material"
import NoShowChart from "../../charts/NoShowChart"

const CHART_PROPS = {
  sx: { pl: 10, pr: 10 },
}

const CustomerNoShowSection: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const customerNoShowData = useMemo(() => {
    const customerAbsentRates = new Map<string, number>()

    for (const { sessionGroup, absentRate } of generateAbsentRates(
      customerSessionGroups
    )) {
      customerAbsentRates.set(sessionGroup.name, absentRate)
    }

    return sortMapByValue(customerAbsentRates)
  }, [customerSessionGroups])

  return (
    <>
      {customerNoShowData && (
        <Box {...CHART_PROPS}>
          <NoShowChart
            chartTitle={"No-Show Rates by Customer"}
            data={customerNoShowData}
          />
        </Box>
      )}
    </>
  )
}

export default CustomerNoShowSection
