// Copyright 2024 Social Fabric, LLC

import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

class UniqueStudents implements ISessionProcessor {
  uniqueStudents: Map<string, number> = new Map()

  processNewSession(session: Session) {
    if (session.isDirect()) {
      const students = session.sessionStudents
        .split(",")
        .map((student) => student.trim())
      students.forEach((studentName) => {
        const newUniqueStudents = this.uniqueStudents.get(studentName) ?? 0
        this.uniqueStudents.set(studentName, newUniqueStudents + 1)
      })
    }
  }

  finalize() {
    /* do nothing */
  }
}

export default UniqueStudents
