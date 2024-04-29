// Copyright 2024 Social Fabric, LLC

import {
  MONTH_NAMES,
  dayOfWeekIterator,
  monthOfYearIterator,
  weekIterator,
} from "../../utils/DateUtils"
import SessionGroup from "../models/SessionGroup"
import SessionGroups from "../models/SessionGroups"

const CHART_MONTH_OFFSET = MONTH_NAMES.indexOf("July")

export function* generateHoursData(
  sessionGroups: SessionGroups,
  timeFrameIteratorFactory: (
    sessionGroup: SessionGroup
  ) => Generator<string, void, unknown>,
  getHoursData: (sessionGroup: SessionGroup, timeFrame: string) => number
) {
  for (const sessionGroup of sessionGroups) {
    for (const timeFrame of timeFrameIteratorFactory(sessionGroup)) {
      const hoursForTimeFrame = getHoursData(sessionGroup, timeFrame)
      yield { timeFrame, hoursForTimeFrame }
    }
  }
}

export function* generateHoursByMonthData(
  sessionGroups: SessionGroups,
  timeFrameIteratorFactory: (
    sessionGroup: SessionGroup
  ) => Generator<string, void, unknown>,
  getHoursData: (sessionGroup: SessionGroup, timeFrame: string) => number
) {
  // TODO: For any session group that has less than 10 hours/month, bundle them into an "Other" category
  for (const sessionGroup of sessionGroups) {
    const hoursData = new Map()
    for (const timeFrame of timeFrameIteratorFactory(sessionGroup)) {
      const hoursForMonth = getHoursData(sessionGroup, timeFrame)
      const newHoursValue = (hoursData.get(timeFrame) ?? 0) + hoursForMonth
      hoursData.set(timeFrame, newHoursValue)
    }
    yield { sessionGroup, hoursData }
  }
}

// Factories for generating time frame iterators
export const weekIteratorFactory = (sessionGroup: SessionGroup) => {
  const { earliestDate, latestDate } = sessionGroup.dateRange()
  return weekIterator(earliestDate, latestDate)
}
export const dayOfWeekIteratorFactory = () => dayOfWeekIterator()
export const monthOfYearIteratorFactory = () =>
  monthOfYearIterator(CHART_MONTH_OFFSET)

// Functions for accessing data about a session group and time frame
export const hoursByWeekData = (sessionGroup: SessionGroup, week: string) =>
  sessionGroup.hoursByWeek().get(week) ?? 0
export const hoursByDayOfWeekData = (
  sessionGroup: SessionGroup,
  dayOfWeek: string
) => sessionGroup.hoursByDayOfWeek().get(dayOfWeek) ?? 0
export const totalHoursData = (sessionGroup: SessionGroup, month: string) =>
  sessionGroup.totalHours(month) ?? 0
