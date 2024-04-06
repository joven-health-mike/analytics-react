// Copyright 2022 Social Fabric, LLC

import { Route, Routes } from "react-router"
import { AvailableRoutes } from "./AvailableRoutes"
import styled from "styled-components"
import { h1Styles } from "../components/styles/mixins"

const Header = styled.h1`
  ${h1Styles}
`

const Container = styled.div`
  margin-left: 250px;
`

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {AvailableRoutes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.url}
            element={<Container>{route.element}</Container>}
          />
        )
      })}
      <Route path="*" element={<Header>404 - Not Found</Header>} />
    </Routes>
  )
}

export default AppRouter
