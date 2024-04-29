// Copyright 2024 Social Fabric, LLC

import { useCallback } from "react"
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
import SessionGroups from "../../data/models/SessionGroups"

const useGeneratorFactories = (
  typeSessionGroups: SessionGroups,
  providerSessionGroups: SessionGroups,
  customerSessionGroups: SessionGroups
) => {
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
    [customerSessionGroups]
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
