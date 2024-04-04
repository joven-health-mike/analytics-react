// Copyright 2022 Social Fabric, LLC

import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import JovenReport from "../reports/JovenReport"
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
