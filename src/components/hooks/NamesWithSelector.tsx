import { useCallback, useEffect, useMemo, useState } from "react"
import SessionGroups from "../../data/models/SessionGroups"

const useNamesWithSelector = (sessionGroups: SessionGroups) => {
  const [selected, setSelected] = useState<string>("")

  const names = useMemo(() => [...sessionGroups.names()], [sessionGroups])

  const previousSelectedNoLongerExists = useCallback(
    () =>
      selected.length > 0 &&
      names.length > 0 &&
      !names.join().includes(selected),
    [selected, names]
  )

  useEffect(() => {
    if (previousSelectedNoLongerExists()) {
      setSelected(names[0])
    }
  }, [previousSelectedNoLongerExists, names])

  return { selected, setSelected, names }
}

export default useNamesWithSelector
