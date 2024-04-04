import { useContext, useEffect } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { useNavigate } from "react-router-dom"

const useNavigateToHomeWhenSessionsCleared = () => {
  const { sessions } = useContext(SessionsContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessions === undefined || sessions.length === 0) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions])

  return {}
}

export default useNavigateToHomeWhenSessionsCleared
