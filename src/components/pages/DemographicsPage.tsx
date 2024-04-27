// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import UploadDataWidget from "../widgets/UploadDataWidget"
import Student, { createStudent } from "../../data/models/Student"
import { createItemsFromCsv } from "../../utils/CsvUtils"
import DemographicsReport from "../reports/demographics-report/DemographicsReport"

const DemographicsPage: React.FC = () => {
  const [sessionsPopulated, setSessionsPopulated] = useState<boolean>(false)
  const [students, setStudents] = useState<Student[]>([])

  return (
    <>
      <DefaultHeader>Student Demographics</DefaultHeader>
      <UploadDataWidget
        prompt="Upload"
        subPrompt="Select your student demographics file to upload."
        hasData={sessionsPopulated}
        onDataLoaded={(data: string[][]) => {
          createItemsFromCsv(data, setStudents, createStudent)
          setSessionsPopulated(true)
        }}
        onDataCleared={() => {
          setStudents([])
          setSessionsPopulated(false)
        }}
      />
      <StudentsContext.Provider value={students}>
        {students.length > 0 && <DemographicsReport />}
      </StudentsContext.Provider>
    </>
  )
}

export const StudentsContext = React.createContext<Student[]>([])

export default DemographicsPage
