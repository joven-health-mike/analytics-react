import { useCallback, useContext } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"
import {
  dayOfWeekIteratorFactory,
  generateHoursByMonthData,
  generateHoursData,
  hoursByDayOfWeekData,
  hoursByWeekData,
  monthOfYearIteratorFactory,
  totalHoursData,
  weekIteratorFactory,
} from "../../data/generators/HoursGenerator"

const useGeneratorFactories = () => {
  const { typeSessionGroups, providerSessionGroups, customerSessionGroups } =
    useContext(SessionsContext)

  const totalHoursGeneratorFactory = useCallback(
    () =>
      generateHoursData(
        typeSessionGroups,
        monthOfYearIteratorFactory,
        totalHoursData
      ),
    [typeSessionGroups]
  )
  const hoursByWeekGeneratorFactory = useCallback(
    () =>
      generateHoursData(
        typeSessionGroups,
        weekIteratorFactory,
        hoursByWeekData
      ),
    [typeSessionGroups]
  )
  const hoursByDayOfWeekGeneratorFactory = useCallback(
    () =>
      generateHoursData(
        typeSessionGroups,
        dayOfWeekIteratorFactory,
        hoursByDayOfWeekData
      ),
    [typeSessionGroups]
  )
  const allHoursStackedGeneratorFactory = useCallback(
    () =>
      generateHoursByMonthData(
        typeSessionGroups,
        monthOfYearIteratorFactory,
        totalHoursData
      ),
    [typeSessionGroups]
  )
  const allProvidersStackedGeneratorFactory = useCallback(
    () =>
      generateHoursByMonthData(
        providerSessionGroups,
        monthOfYearIteratorFactory,
        totalHoursData
      ),
    [providerSessionGroups]
  )
  const allCustomersStackedGeneratorFactory = useCallback(
    () =>
      generateHoursByMonthData(
        customerSessionGroups,
        monthOfYearIteratorFactory,
        totalHoursData
      ),
    [providerSessionGroups]
  )

  return {
    totalHoursGeneratorFactory,
    hoursByWeekGeneratorFactory,
    hoursByDayOfWeekGeneratorFactory,
    allHoursStackedGeneratorFactory,
    allProvidersStackedGeneratorFactory,
    allCustomersStackedGeneratorFactory,
  }
}

export default useGeneratorFactories
