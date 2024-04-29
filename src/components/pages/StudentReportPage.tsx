// Copyright 2024 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import DefaultSelectInput from "../widgets/mui/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import useNamesWithSelector from "../hooks/NamesWithSelector"
import StudentReport from "../reports/student-report/StudentReport"
import { StudentNameContext } from "../../data/providers/providers"

const StudentReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  const { studentSessionGroups } = useContext(SessionsContext)
  const {
    selected: selectedStudent,
    setSelected: setSelectedStudent,
    names: studentNames,
  } = useNamesWithSelector(studentSessionGroups)

  return (
    <>
      <DefaultHeader>Student Report</DefaultHeader>
      <DefaultSelectInput
        label="Select a Student"
        items={studentNames}
        enableSelectAll={false}
        onItemSelected={(item) => {
          setSelectedStudent(item)
        }}
      />
      <StudentNameContext.Provider value={selectedStudent}>
        <StudentReport />
      </StudentNameContext.Provider>
    </>
  )
}

export default StudentReportPage
