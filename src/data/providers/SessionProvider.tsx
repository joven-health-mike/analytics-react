import { ReactNode, createContext, useMemo, useState } from "react"
import SessionGroups, {
  createEmptySessionGroups,
  createSessionGroups,
} from "../SessionGroups"
import Session from "../Session"
import {
  filterByCustomer as byCustomer,
  filterByProvider as byProvider,
  filterByType as byType,
  filterByStudent as byStudent,
} from "../Session"

export type SessionsDataProviderProps = {
  sessions: Session[]
  children?: ReactNode | undefined
}

type SessionsContextData = {
  sessions: Session[]
  customerSessionGroups: SessionGroups
  providerSessionGroups: SessionGroups
  typeSessionGroups: SessionGroups
  studentSessionGroups: SessionGroups
  setSessions: (input: Session[]) => void
}

const emptySessionGroups = createEmptySessionGroups()

export const SessionsContext = createContext<SessionsContextData>({
  sessions: [],
  customerSessionGroups: emptySessionGroups,
  providerSessionGroups: emptySessionGroups,
  typeSessionGroups: emptySessionGroups,
  studentSessionGroups: emptySessionGroups,
  setSessions: () => null,
})

export const AllSessionsProvider: React.FC<SessionsDataProviderProps> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([])

  const customerSessionGroups = useMemo(() => {
    return sessions.length > 0
      ? createSessionGroups(sessions, byCustomer)
      : emptySessionGroups
  }, [sessions.length])

  const providerSessionGroups = useMemo(() => {
    return sessions.length > 0
      ? createSessionGroups(sessions, byProvider)
      : emptySessionGroups
  }, [sessions.length])

  const typeSessionGroups = useMemo(() => {
    return sessions.length > 0
      ? createSessionGroups(sessions, byType)
      : emptySessionGroups
  }, [sessions.length])

  const studentSessionGroups = useMemo(() => {
    return sessions.length > 0
      ? createSessionGroups(sessions, byStudent)
      : emptySessionGroups
  }, [sessions.length])

  const delegate: SessionsContextData = {
    sessions: sessions,
    customerSessionGroups: customerSessionGroups,
    providerSessionGroups: providerSessionGroups,
    typeSessionGroups: typeSessionGroups,
    studentSessionGroups: studentSessionGroups,
    setSessions: setSessions,
  }

  return (
    <SessionsContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </SessionsContext.Provider>
  )
}
