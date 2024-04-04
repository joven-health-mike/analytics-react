import { useContext, useEffect, useState } from "react"
import SessionGroup, { createEmptySessionGroup } from "../../data/SessionGroup"
import { ProviderNameContext } from "../../data/providers/ProviderNameProvider"
import SessionGroups from "../../data/SessionGroups"

const useCurrentSessionGroup = (
  sessionGroups: SessionGroups,
  nameContext: React.Context<string> = ProviderNameContext
) => {
  const name = useContext(nameContext)
  const [currentSessionGroup, setCurrentSessionGroup] = useState<SessionGroup>(
    createEmptySessionGroup()
  )

  useEffect(() => {
    setCurrentSessionGroup(
      sessionGroups.getSessionGroupForName(name) ?? createEmptySessionGroup()
    )
  }, [name, sessionGroups])

  return { name, currentSessionGroup }
}

export default useCurrentSessionGroup
