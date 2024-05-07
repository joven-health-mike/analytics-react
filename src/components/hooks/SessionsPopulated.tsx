// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"

const useSessionsPopulated = () => {
  const {
    sessions,
    customerSessionGroups,
    providerSessionGroups,
    typeSessionGroups,
    studentSessionGroups,
  } = useContext(SessionsContext)
  const sessionsPopulated = useMemo(
    () => sessions.length > 0,
    [sessions.length]
  )
  const customerSessionGroupsPopulated = useMemo(
    () => [...customerSessionGroups].length > 0,
    [customerSessionGroups]
  )
  const providerSessionGroupsPopulated = useMemo(
    () => [...providerSessionGroups].length > 0,
    [providerSessionGroups]
  )
  const typeSessionGroupsPopulated = useMemo(
    () => [...typeSessionGroups].length > 0,
    [typeSessionGroups]
  )
  const studentSessionGroupsPopulated = useMemo(
    () => [...studentSessionGroups].length > 0,
    [studentSessionGroups]
  )

  return {
    sessionsPopulated,
    customerSessionGroupsPopulated,
    providerSessionGroupsPopulated,
    typeSessionGroupsPopulated,
    studentSessionGroupsPopulated,
  }
}

export default useSessionsPopulated
