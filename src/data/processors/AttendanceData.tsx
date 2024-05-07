// Copyright 2024 Social Fabric, LLC

import {
  MONTH_NAMES,
  getEarlierDate,
  getFirstDayOfWeekName,
  getLaterDate,
  getMonthName,
  monthOfYearIterator,
  weekIterator,
} from "../../utils/DateUtils"
import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

const superEarlyDate = new Date("01/01/2100")
const superLateDate = new Date("01/01/2000")
const START_MONTH = MONTH_NAMES.indexOf("July")

class AttendanceData implements ISessionProcessor {
  numPresences = 0
  numAbsences = 0
  absentRate = 0

  presencesByMonth: Map<string, number> = new Map()
  absencesByMonth: Map<string, number> = new Map()
  absenceRatesByMonth: Map<string, number> = new Map()

  presencesByWeek: Map<string, number> = new Map()
  absencesByWeek: Map<string, number> = new Map()
  absenceRatesByWeek: Map<string, number> = new Map()

  private earliestDate: Date = superEarlyDate
  private latestDate: Date = superLateDate

  private calculateOverallAttendance(session: Session): void {
    if (session.isDirect() && session.isPresent()) {
      this.numPresences++
    } else if (session.isDirect() && !session.isPresent()) {
      this.numAbsences++
    }
  }

  private calculateMonthlyAttendance(session: Session): void {
    const sessionDate = new Date(session.date)
    const monthName = getMonthName(sessionDate)
    if (session.isDirect() && session.isPresent()) {
      const newPresentCount = this.presencesByMonth.get(monthName) ?? 0
      this.presencesByMonth.set(monthName, newPresentCount + 1)
    } else if (session.isDirect() && !session.isPresent()) {
      const newAbsentCount = this.absencesByMonth.get(monthName) ?? 0
      this.absencesByMonth.set(monthName, newAbsentCount + 1)
    }
  }

  private calculateWeeklyAttendance(session: Session): void {
    const sessionDate = new Date(session.date)
    const weekName = getFirstDayOfWeekName(sessionDate)
    if (session.isDirect() && session.isPresent()) {
      const newPresencesCount = this.presencesByWeek.get(weekName) ?? 0
      this.presencesByWeek.set(weekName, newPresencesCount + 1)
    } else if (session.isDirect() && !session.isPresent()) {
      const newAbsencesCount = this.absencesByWeek.get(weekName) ?? 0
      this.absencesByWeek.set(weekName, newAbsencesCount + 1)
    }
  }

  private calculateOverallAbsentRates = () => {
    this.absentRate = calculateAbsentRate(this.numPresences, this.numAbsences)
  }

  private calculateMonthlyAbsentRates = () => {
    for (const monthName of monthOfYearIterator(START_MONTH)) {
      const presencesForMonth = this.presencesByMonth!.get(monthName) ?? 0
      const absencesForMonth = this.absencesByMonth!.get(monthName) ?? 0
      this.absenceRatesByMonth.set(
        monthName,
        calculateAbsentRate(presencesForMonth, absencesForMonth)
      )
    }
  }

  private calculateWeeklyAbsentRates = () => {
    for (const weekName of weekIterator(this.earliestDate, this.latestDate)) {
      this.absenceRatesByWeek.set(
        weekName,
        calculateAbsentRate(
          this.presencesByWeek!.get(weekName) ?? 0,
          this.absencesByWeek!.get(weekName) ?? 0
        )
      )
    }
  }

  processNewSession(session: Session) {
    const sessionDate = new Date(session.date)
    this.earliestDate = getEarlierDate(this.earliestDate, sessionDate)
    this.latestDate = getLaterDate(this.latestDate, sessionDate)
    this.calculateOverallAttendance(session)
    this.calculateMonthlyAttendance(session)
    this.calculateWeeklyAttendance(session)
  }

  finalize() {
    this.calculateOverallAbsentRates()
    this.calculateMonthlyAbsentRates()
    this.calculateWeeklyAbsentRates()
  }
}

const calculateAbsentRate = (present: number, absent: number): number => {
  return parseFloat(
    (absent + present === 0 ? 0 : (100 * absent) / (absent + present)).toFixed(
      3
    )
  )
}

export default AttendanceData
