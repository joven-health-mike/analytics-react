import {
  MONTH_NAMES,
  getMonthName,
  monthOfYearIterator,
} from "../../utils/DateUtils"
import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

const START_MONTH = MONTH_NAMES.indexOf("July")

class SessionMinutes implements ISessionProcessor {
  numMinutes = 0
  minutesByMonth: Map<string, number> = new Map()
  hoursByMonth: Map<string, number> = new Map()

  processNewSession(session: Session) {
    const monthName = getMonthName(new Date(session.date))
    const sessionTime = parseInt(session.totalTime)
    this.minutesByMonth.set(
      monthName,
      (this.minutesByMonth.get(monthName) ?? 0) + sessionTime
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
  }
}

export default SessionMinutes
