import { useEffect, useState } from "react"
import SessionGroups from "../../data/SessionGroups"

const useNamesWithSelector = (sessionGroups: SessionGroups) => {
  const [names, setNames] = useState<string[]>([])
  const [selected, setSelected] = useState<string>("")

  useEffect(() => {
    setNames([...sessionGroups.names()])
  }, [sessionGroups])

  useEffect(() => {
    if (
      selected.length > 0 &&
      names.length > 0 &&
      !names.join().includes(selected)
    ) {
      setSelected(names[0])
    }
  }, [names])

  return { selected, setSelected, names }
}

export default useNamesWithSelector
