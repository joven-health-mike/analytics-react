// Copyright 2024 Social Fabric, LLC

import SessionGroups from "../models/SessionGroups"

export function* generateAbsentRates(sessionGroups: SessionGroups) {
  for (const sessionGroup of sessionGroups) {
    // filter out customers with 0 absent rate
    if (sessionGroup.absentRate() > 0) {
      yield { sessionGroup, absentRate: sessionGroup.absentRate() }
    }
  }
}
