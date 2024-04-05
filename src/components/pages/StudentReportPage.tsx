// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import useNamesWithSelector from "../hooks/NamesWithSelector"
import { StudentNameContext } from "../../data/providers/StudentNameProvider"
import StudentReport from "../reports/StudentReport"

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
      <Navbar />
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
