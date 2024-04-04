// Copyright 2022 Social Fabric, LLC

import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { h1Styles } from "../components/styles/mixins"
import { AvailableRoutes } from "./AvailableRoutes"

const Header = styled.h1`
  ${h1Styles}
`

const Container = styled.div`
  margin-left: 250px;
`

const PrivateRoutes: React.FC = () => {
  return (
    // allow available routes based on user permissions
    <Routes>
      <>
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
      </>
    </Routes>
  )
}

export default PrivateRoutes
