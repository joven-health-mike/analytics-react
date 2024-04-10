import Session from "../models/Session"
import { ISessionProcessor } from "./ISessionProcessor"

class SessionTypeTimes implements ISessionProcessor {
  sessionTypeTimes: Map<string, number> = new Map()

  processNewSession(session: Session) {
    const newValue =
      (this.sessionTypeTimes.get(session.enhancedServiceName()) ?? 0) +
      parseInt(session.totalTime)

    this.sessionTypeTimes.set(session.enhancedServiceName(), newValue)
  }

  finalize() {
    /* do nothing */
  }
}

export default SessionTypeTimes
