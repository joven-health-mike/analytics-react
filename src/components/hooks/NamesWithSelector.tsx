import { useCallback, useEffect, useState } from "react"
import SessionGroups from "../../data/SessionGroups"

const useNamesWithSelector = (sessionGroups: SessionGroups) => {
  const [names, setNames] = useState<string[]>([])
  const [selected, setSelected] = useState<string>("")

  useEffect(() => {
    setNames([...sessionGroups.names()])
  }, [sessionGroups])

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
