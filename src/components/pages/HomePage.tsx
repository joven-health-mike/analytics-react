// Copyright 2022 Social Fabric, LLC

import React from "react"
import styled from "styled-components"
import { buttonStyles } from "../styles/mixins"
import Navbar from "../navbar/Navbar"
import { useNavigate } from "react-router-dom"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultHeader from "../widgets/DefaultHeader"
import UploadServiceDataWidget from "../widgets/UploadServiceDataWidget"
import HorizontalLine from "../widgets/HorizontalLine"
import useSessionsPopulated from "../hooks/SessionsPopulated"

const CustomButton = styled.button`
  ${buttonStyles}
  width: 100%;
`

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { sessionsPopulated } = useSessionsPopulated()

  const buttons = [
    { name: "Joven Health Report", onClick: () => navigate("/joven") },
    { name: "Customer Report", onClick: () => navigate("/customer") },
    { name: "Provider Report", onClick: () => navigate("/provider") },
  ]

  return (
    <>
      <Navbar />
      <DefaultHeader>Home</DefaultHeader>
      <UploadServiceDataWidget />
      <HorizontalLine />
      {sessionsPopulated && (
        <DefaultGrid direction="row">
          {buttons.map((button, index) => (
            <DefaultGridItem key={index}>
              <CustomButton onClick={button.onClick}>
                {button.name}
              </CustomButton>
            </DefaultGridItem>
          ))}
        </DefaultGrid>
      )}
    </>
  )
}

export default HomePage
