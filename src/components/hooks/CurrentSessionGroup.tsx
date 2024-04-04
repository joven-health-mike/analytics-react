import { useContext, useEffect, useState } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { CustomerNameContext } from "../pages/CustomerReportPage"
import SessionGroup, { createEmptySessionGroup } from "../../data/SessionGroup"

const useCurrentSessionGroup = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const customerName = useContext(CustomerNameContext)
  const [currentSessionGroup, setCurrentSessionGroup] = useState<SessionGroup>(
    createEmptySessionGroup()
  )

  useEffect(() => {
    setCurrentSessionGroup(
      customerSessionGroups.getSessionGroupForName(customerName) ??
        createEmptySessionGroup()
    )
  }, [customerName, customerSessionGroups])

  return { currentSessionGroup }
}

export default useCurrentSessionGroup
