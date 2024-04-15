import {
  MONTH_NAMES,
  dayOfWeekIterator,
  getDayOfWeekName,
  getMonthName,
  monthOfYearIterator,
} from "../../utils/DateUtils"
import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

const START_MONTH = MONTH_NAMES.indexOf("July")

class SessionMinutes implements ISessionProcessor {
  numMinutes = 0
  minutesByDayOfWeek: Map<string, number> = new Map()
  hoursByDayOfWeek: Map<string, number> = new Map()
  minutesByMonth: Map<string, number> = new Map()
  hoursByMonth: Map<string, number> = new Map()

  processNewSession(session: Session) {
    const sessionDate = new Date(session.date)
    const monthName = getMonthName(sessionDate)
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
    this.numMinutes += sessionTime
  }

  finalize() {
    for (const monthName of monthOfYearIterator(START_MONTH)) {
      const minutesForMonth = this.minutesByMonth.get(monthName) ?? 0
      this.hoursByMonth.set(
        monthName,
        parseFloat((minutesForMonth / 60).toFixed(3))
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
  }
}

export default SessionMinutes
