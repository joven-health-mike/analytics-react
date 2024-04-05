import { useContext, useMemo } from "react"
import { createEmptySessionGroup } from "../../data/SessionGroup"
import SessionGroups from "../../data/SessionGroups"

const useCurrentSessionGroup = (
  sessionGroups: SessionGroups,
  nameContext: React.Context<string>
) => {
  const name = useContext(nameContext)

  const currentSessionGroup = useMemo(() => {
    return (
      sessionGroups.getSessionGroupForName(name) ?? createEmptySessionGroup()
    )
  }, [name])

  return { name, currentSessionGroup }
}

export default useCurrentSessionGroup
