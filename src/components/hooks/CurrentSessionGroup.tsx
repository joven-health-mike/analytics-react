// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { createEmptySessionGroup } from "../../data/models/SessionGroup"
import SessionGroups from "../../data/models/SessionGroups"

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
