// Copyright 2022 Social Fabric, LLC

import { Route, Routes } from "react-router"
import { AvailableRoutes } from "./AvailableRoutes"
import DefaultHeader from "../components/widgets/mui/DefaultHeader"

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {AvailableRoutes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.url}
            element={<div>{route.element}</div>}
          />
        )
      })}
      <Route
        path="*"
        element={<DefaultHeader>404 - Not Found</DefaultHeader>}
      />
    </Routes>
  )
}

export default AppRouter
