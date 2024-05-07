// Copyright 2024 Social Fabric, LLC

import AttendanceData from "../processors/AttendanceData"
import { ISessionProcessor } from "../processors/ISessionProcessor"
import SessionMinutes from "../processors/SessionMinutes"
import SessionTypeTimes from "../processors/SessionTypeTimes"
import UniqueStudents from "../processors/UniqueStudents"
import Session from "./Session"

export default class SessionGroupData {
  sessionMinutes = new SessionMinutes()
  attendanceData = new AttendanceData()
  sessionTypeTimes = new SessionTypeTimes()
  uniqueStudents = new UniqueStudents()

  dataProcessors: ISessionProcessor[] = [
    this.sessionMinutes,
    this.attendanceData,
    this.sessionTypeTimes,
    this.uniqueStudents,
  ]

  processNewSession(session: Session): void {
    this.dataProcessors.forEach((processor) =>
      processor.processNewSession(session)
    )
  }

  finalize(): void {
    this.dataProcessors.forEach((processor) => processor.finalize())
  }
}
