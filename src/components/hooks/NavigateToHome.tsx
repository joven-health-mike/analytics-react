import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SessionsContext } from "../../data/providers/SessionProvider"

const useNavigateToHomeWhenSessionsCleared = () => {
  const { sessions } = useContext(SessionsContext)
  const navigate = useNavigate()

  useEffect(() => {
    const sessionsPopulated = sessions.length > 0
    if (!sessionsPopulated) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions.length])

  return {}
}

export default useNavigateToHomeWhenSessionsCleared
