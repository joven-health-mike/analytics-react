// Copyright 2024 Social Fabric, LLC

import { useEffect, useMemo, useState } from "react"

const MOBILE_THREASHOLD = 1110

const useIsMobile = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const isMobile = useMemo(() => width <= MOBILE_THREASHOLD, [width])

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return isMobile
}

export default useIsMobile
