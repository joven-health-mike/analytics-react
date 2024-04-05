import { useContext, useMemo } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"

const useSessionsPopulated = () => {
  const { sessions } = useContext(SessionsContext)
  const sessionsPopulated = useMemo(
    () => sessions.length > 0,
    [sessions.length]
  )

  return { sessionsPopulated }
}

export default useSessionsPopulated
