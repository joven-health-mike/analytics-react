// Copyright 2022 Social Fabric, LLC

import styled from "styled-components"
import { buttonStyles } from "../styles/mixins"
import { useNavigate } from "react-router-dom"
import DefaultGrid from "../widgets/DefaultGrid"
import DefaultGridItem from "../widgets/DefaultGridItem"
import DefaultHeader from "../widgets/DefaultHeader"
import UploadServiceDataWidget from "../widgets/UploadServiceDataWidget"
import HorizontalLine from "../widgets/HorizontalLine"
import useSessionsPopulated from "../hooks/SessionsPopulated"
import { useMemo } from "react"

const CustomButton = styled.button`
  ${buttonStyles}
  width: 100%;
`

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const {
    sessionsPopulated,
    customerSessionGroupsPopulated,
    providerSessionGroupsPopulated,
    studentSessionGroupsPopulated,
  } = useSessionsPopulated()

  const buttons = useMemo(
    () => [
      {
        name: "Joven Health Report",
        onClick: () => navigate("/joven"),
        shouldDisplay: () => true,
      },
      {
        name: "Customer Report",
        onClick: () => navigate("/customer"),
        shouldDisplay: () => customerSessionGroupsPopulated,
      },
      {
        name: "Provider Report",
        onClick: () => navigate("/provider"),
        shouldDisplay: () => providerSessionGroupsPopulated,
      },
      {
        name: "Student Report",
        onClick: () => navigate("/student"),
        shouldDisplay: () => studentSessionGroupsPopulated,
      },
    ],
    [
      customerSessionGroupsPopulated,
      providerSessionGroupsPopulated,
      studentSessionGroupsPopulated,
    ]
  )

  // TODO: Add selection for "Joven" or "Customer" or "Provider" user type
  // TODO: Add error handling for invalid file upload
  // TODO: Documentation in README.md

  return (
    <>
      <DefaultHeader>Home</DefaultHeader>
      <UploadServiceDataWidget />
      <HorizontalLine />
      {sessionsPopulated && (
        <DefaultGrid direction="row">
          {buttons.map((button, index) => {
            return button.shouldDisplay() ? (
              <DefaultGridItem key={index}>
                <CustomButton onClick={button.onClick}>
                  {button.name}
                </CustomButton>
              </DefaultGridItem>
            ) : (
              <></>
            )
          })}
        </DefaultGrid>
      )}
    </>
  )
}

export default HomePage
