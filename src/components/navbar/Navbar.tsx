// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import { IconContext } from "react-icons"
import { allNavItems, NavItem } from "./navBarItems"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import NavBarText from "../widgets/NavBarText"
import useIsMobile from "../hooks/IsMobile"

const Navbar: React.FC = () => {
  const { sessions: allSessions, studentSessionGroups } =
    useContext(SessionsContext)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <>
      <nav>
        <IconContext.Provider value={{ color: "#77caf2" }}>
          {allNavItems.map((item: NavItem, index: number) => (
            <>
              {item.shouldDisplay(
                allSessions.length,
                [...studentSessionGroups].length
              ) && (
                <Button
                  LinkComponent={Link}
                  startIcon={item.icon}
                  key={index}
                  onClick={() => {
                    console.log(`CLICK: ${item.path}`)
                    if (item.path[0] === "/") {
                      navigate(item.path, { replace: true })
                    } else {
                      window.location.href = item.path
                    }
                  }}
                  sx={{ p: 3 }}
                >
                  {!isMobile && <NavBarText>{item.title}</NavBarText>}
                </Button>
              )}
            </>
          ))}
        </IconContext.Provider>
      </nav>
    </>
  )
}

export default Navbar
