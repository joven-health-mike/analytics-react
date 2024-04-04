import { useContext, useEffect, useState } from "react"
import { SessionsContext } from "../../data/providers/SessionProvider"
import SessionGroup, { createEmptySessionGroup } from "../../data/SessionGroup"
import { ProviderNameContext } from "../../data/providers/ProviderNameProvider"

const useCurrentProviderSessionGroup = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const providerName = useContext(ProviderNameContext)
  const [currentSessionGroup, setCurrentSessionGroup] = useState<SessionGroup>(
    createEmptySessionGroup()
  )

  useEffect(() => {
    setCurrentSessionGroup(
      providerSessionGroups.getSessionGroupForName(providerName) ??
        createEmptySessionGroup()
    )
  }, [providerName, providerSessionGroups])

  return { providerName, currentSessionGroup }
}

export default useCurrentProviderSessionGroup
