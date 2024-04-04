// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import JovenReport from "../data-widgets/JovenReport"

const JovenReportPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <DefaultHeader>Joven Health Report</DefaultHeader>
      <JovenReport />
    </>
  )
}

export default JovenReportPage
