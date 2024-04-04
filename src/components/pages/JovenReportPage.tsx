// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import JovenReport from "../data-widgets/JovenReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"

const JovenReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  return (
    <>
      <Navbar />
      <DefaultHeader>Joven Health Report</DefaultHeader>
      <JovenReport />
    </>
  )
}

export default JovenReportPage
