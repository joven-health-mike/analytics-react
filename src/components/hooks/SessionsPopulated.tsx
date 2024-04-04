import { useContext, useEffect, useState } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"

const useSessionsPopulated = () => {
  const { sessions } = useContext(SessionsContext)
  const [sessionsPopulated, setSessionsPopulated] = useState<boolean>(false)

  useEffect(() => {
    setSessionsPopulated(sessions.length > 0)
  }, [sessions.length])

  return { sessionsPopulated }
}

export default useSessionsPopulated
