// Copyright 2024 Social Fabric, LLC

import { useContext, useMemo } from "react"
import { IconContext } from "react-icons"
import { NavItem, allNavItems } from "./navBarItems"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import NavBarText from "../widgets/mui/NavBarText"
import useIsMobile from "../hooks/IsMobile"

const ICON_COLOR = "#77caf2"

const Navbar: React.FC = () => {
  const { sessions: allSessions, studentSessionGroups } =
    useContext(SessionsContext)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const handleButtonClick = (path: string) => {
    if (path[0] === "/") {
      // internal link - use react-router to navigate
      navigate(path)
    } else {
      // external link - use window to navigate
      window.location.href = path
    }
  }

  const buttonProps = (item: NavItem) => ({
    LinkComponent: Link,
    startIcon: item.icon,
    key: item.title,
    onClick: () => {
      handleButtonClick(item.path)
    },
    sx: { p: 3 },
  })

  const navButtons = useMemo(
    () => [...generateNavButtons()],
    [allSessions, isMobile]
  )

  function* generateNavButtons() {
    for (const item of allNavItems) {
      if (
        item.shouldDisplay(allSessions.length, [...studentSessionGroups].length)
      ) {
        yield (
          <Button {...buttonProps(item)}>
            {/* don't show nav item text on mobile */}
            {!isMobile && <NavBarText>{item.title}</NavBarText>}
          </Button>
        )
      }
    }
  }

  return (
    <nav>
      <IconContext.Provider value={{ color: ICON_COLOR }}>
        {navButtons}
      </IconContext.Provider>
    </nav>
  )
}

export default Navbar
