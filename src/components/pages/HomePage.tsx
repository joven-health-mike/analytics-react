// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import styled from "styled-components"
import { buttonStyles } from "../styles/mixins"
import Navbar from "../navbar/Navbar"
import { useNavigate } from "react-router-dom"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultHeader from "../widgets/DefaultHeader"
import ProviderReportUploadWidget from "../data-widgets/ProviderReportUploadWidget"
import HorizontalLine from "../widgets/HorizontalLine"
import { SessionsContext } from "../../data/providers/SessionProvider"

const CustomButton = styled.button`
  ${buttonStyles}
  width: 100%;
`

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { sessions: allSessions } = useContext(SessionsContext)

  return (
    <>
      <Navbar />
      <DefaultHeader>Home</DefaultHeader>
      <>
        <ProviderReportUploadWidget />
        <HorizontalLine />
      </>
      {allSessions.length > 0 && (
        <DefaultGrid direction="row">
          <DefaultGridItem>
            <CustomButton onClick={() => navigate("/analytics")}>
              Analytics
            </CustomButton>
          </DefaultGridItem>
        </DefaultGrid>
      )}
    </>
  )
}

export default HomePage
