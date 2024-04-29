// Copyright 2024 Social Fabric, LLC

import DefaultHeader from "../widgets/mui/DefaultHeader"
import JovenReport from "../reports/joven-report/JovenReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"

const JovenReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  return (
    <>
      <DefaultHeader>Joven Health Report</DefaultHeader>
      <JovenReport />
    </>
  )
}

export default JovenReportPage
