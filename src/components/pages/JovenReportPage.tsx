// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import JovenDataSection from "../data-widgets/JovenDataSection"

const JovenReportPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <DefaultHeader>Joven Health Report</DefaultHeader>
      <JovenDataSection />
    </>
  )
}

export default JovenReportPage
