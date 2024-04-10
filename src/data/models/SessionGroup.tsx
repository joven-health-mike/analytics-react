import { compareDates } from "../../utils/DateUtils"
import Session from "./Session"
import SessionGroupData from "./SessionGroupData"

export default class SessionGroup {
  constructor(public name: string, public sessions: Session[]) {}
  private loaded = false
  private sessionGroupData = new SessionGroupData()

  uniqueStudents(): number {
    this.loadMetrics()
    return [...this.sessionGroupData.uniqueStudents.uniqueStudents.keys()]
      .length
  }

  totalHours(month?: string): number {
    this.loadMetrics()
    if (month) {
      const hours =
        this.sessionGroupData.sessionMinutes.hoursByMonth.get(month) ?? 0
      return hours
    } else {
      return parseFloat(
        (this.sessionGroupData.sessionMinutes.numMinutes / 60).toFixed(3)
      )
    }
  }

  hoursByMonth(): Map<string, number> {
    this.loadMetrics()
    return this.sessionGroupData.sessionMinutes.hoursByMonth
  }

  presences(): number {
    this.loadMetrics()
    return this.sessionGroupData.attendanceData.numPresences
  }

  absences(): number {
    this.loadMetrics()
    return this.sessionGroupData.attendanceData.numAbsences
  }

  absentRate(): number {
    this.loadMetrics()
    return this.sessionGroupData.attendanceData.absentRate
  }

  noShowRatesByMonth(): Map<string, number> {
    this.loadMetrics()
    return this.sessionGroupData.attendanceData.absenceRatesByMonth
  }

  noShowRatesByWeek(): Map<string, number> {
    this.loadMetrics()
    return this.sessionGroupData.attendanceData.absenceRatesByWeek
  }

  sessionTypeTimes(): Map<string, number> {
    this.loadMetrics()
    return this.sessionGroupData.sessionTypeTimes.sessionTypeTimes
  }

  *filteredSessions(filter = (_: Session) => true): IterableIterator<Session> {
    for (const session of this.sessions) {
      if (filter(session)) {
        yield session
      }
    }
  }

  *[Symbol.iterator](): IterableIterator<Session> {
    for (const session of this.sessions) {
      yield session
    }
  }

  private loadMetrics(): void {
    // NOTE: When called with an empty session list, this function will cause slow-loading issues. So, skip loading metrics if there are no sessions.
    if (this.sessions.length > 0 && this.loaded === false) {
      const sortedSessions = [...this.sessions]
      sortedSessions.sort((a: Session, b: Session) => {
        return compareDates(new Date(a.date), new Date(b.date))
      })
      for (const session of sortedSessions) {
        this.sessionGroupData.processNewSession(session)
      }
      this.sessionGroupData.finalize()
      this.loaded = true
    }
  }
}

export const createSessionGroup = (name: string, sessions: Session[]) => {
  return new SessionGroup(name, sessions)
}

let emptySessionGroup: SessionGroup | undefined = undefined

export const createEmptySessionGroup = () => {
  if (!emptySessionGroup) {
    emptySessionGroup = new SessionGroup("", [])
  }
  return emptySessionGroup
}
