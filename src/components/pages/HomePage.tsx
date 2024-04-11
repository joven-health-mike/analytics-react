// Copyright 2022 Social Fabric, LLC

import { useNavigate } from "react-router-dom"
import DefaultGrid from "../widgets/mui/DefaultGrid"
import DefaultGridItem from "../widgets/mui/DefaultGridItem"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import UploadServiceDataWidget from "../widgets/UploadServiceDataWidget"
import HorizontalLine from "../widgets/mui/HorizontalLine"
import useSessionsPopulated from "../hooks/SessionsPopulated"
import { useMemo } from "react"
import DefaultButton from "../widgets/mui/DefaultButton"

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
                <DefaultButton onClick={button.onClick}>
                  {button.name}
                </DefaultButton>
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
