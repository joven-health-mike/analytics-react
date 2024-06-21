// Copyright 2024 Social Fabric, LLC

import {
  MONTH_NAMES,
  dayOfWeekIterator,
  getDayOfWeekName,
  getEarlierDate,
  getFirstDayOfWeekName,
  getLaterDate,
  getMonthName,
  getWeekdayCountInMonth,
  monthOfYearIterator,
  weekIterator,
} from "../../utils/DateUtils"
import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

const superEarlyDate = new Date("01/01/2100")
const superLateDate = new Date("01/01/2000")
const START_MONTH = MONTH_NAMES.indexOf("July")

class SessionMinutes implements ISessionProcessor {
  numMinutes = 0
  minutesByDayOfWeek: Map<string, number> = new Map()
  hoursByDayOfWeek: Map<string, number> = new Map()
  minutesByMonth: Map<string, number> = new Map()
  hoursByMonth: Map<string, number> = new Map()
  minutesByWeek: Map<string, number> = new Map()
  hoursByWeek: Map<string, number> = new Map()
  dailyHours: Map<string, number> = new Map()

  earliestDate: Date = superEarlyDate
  latestDate: Date = superLateDate

  processNewSession(session: Session) {
    const sessionDate = new Date(session.date)
    this.earliestDate = getEarlierDate(this.earliestDate, sessionDate)
    this.latestDate = getLaterDate(this.latestDate, sessionDate)
    const monthName = getMonthName(sessionDate)
    const weekName = getFirstDayOfWeekName(sessionDate)
    const dayOfWeekName = getDayOfWeekName(sessionDate)
    const sessionTime = parseInt(session.totalTime)
    this.minutesByMonth.set(
      monthName,
      (this.minutesByMonth.get(monthName) ?? 0) + sessionTime
    )
    this.minutesByDayOfWeek.set(
      dayOfWeekName,
      (this.minutesByDayOfWeek.get(dayOfWeekName) ?? 0) + sessionTime
    )
    this.minutesByWeek.set(
      weekName,
      (this.minutesByWeek.get(weekName) ?? 0) + sessionTime
    )
    this.numMinutes += sessionTime
  }

  finalize() {
    for (const monthName of monthOfYearIterator(START_MONTH)) {
      const minutesForMonth = this.minutesByMonth.get(monthName) ?? 0
      const schoolDaysForMonth = getWeekdayCountInMonth(2024, monthName)
      this.hoursByMonth.set(
        monthName,
        parseFloat((minutesForMonth / 60).toFixed(3))
      )
      this.dailyHours.set(
        monthName,
        parseFloat((minutesForMonth / 60 / schoolDaysForMonth).toFixed(3))
      )
    }

    for (const dayOfWeekName of dayOfWeekIterator()) {
      const minutesForDayOfWeek =
        this.minutesByDayOfWeek.get(dayOfWeekName) ?? 0
      this.hoursByDayOfWeek.set(
        dayOfWeekName,
        parseFloat((minutesForDayOfWeek / 60).toFixed(1))
      )
    }

    for (const weekName of weekIterator(this.earliestDate, this.latestDate)) {
      const minutesForWeek = this.minutesByWeek.get(weekName) ?? 0
      this.hoursByWeek.set(
        weekName,
        parseFloat((minutesForWeek / 60).toFixed(1))
      )
    }
  }
}

export default SessionMinutes
