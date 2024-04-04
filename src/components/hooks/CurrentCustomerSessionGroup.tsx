import { useContext, useEffect, useState } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"
import SessionGroup, { createEmptySessionGroup } from "../../data/SessionGroup"
import { CustomerNameContext } from "../../data/providers/CustomerNameProvider"

const useCurrentCustomerSessionGroup = () => {
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

  return { customerName, currentSessionGroup }
}

export default useCurrentCustomerSessionGroup
