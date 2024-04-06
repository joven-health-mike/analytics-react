import { useContext } from "react"
import AppRouter from "./routes/AppRouter"
import {
  SessionsContext,
  AllSessionsProvider,
} from "./data/providers/SessionProvider"
import { AppBar, ThemeProvider, Toolbar, createTheme } from "@mui/material"
import Navbar from "./components/navbar/Navbar"

function App() {
  const { sessions: allSessions } = useContext(SessionsContext)

  const theme = createTheme({
    palette: {
      primary: {
        main: "#385aa8",
      },
      secondary: {
        main: "#77caf2",
      },
    },
  })

  return (
    <AllSessionsProvider sessions={allSessions}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="fixed">
            <Navbar />
          </AppBar>
          <Toolbar />
          <AppRouter />
        </div>
      </ThemeProvider>
    </AllSessionsProvider>
  )
}

export default App
