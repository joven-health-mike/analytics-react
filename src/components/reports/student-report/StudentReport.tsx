// Copyright 2024 Social Fabric, LLC

import React, { useContext } from "react"
import DefaultHeader from "../../widgets/mui/DefaultHeader"
import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import useCurrentSessionGroup from "../../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import { StudentNameContext } from "../../../data/providers/providers"
import OverviewSection from "./OverviewSection"

const StudentReport: React.FC = () => {
  const { studentSessionGroups } = useContext(SessionsContext)
  // TODO: What if a student name exists for multiple schools? Or the same name in a particular school?
  // TODO: List out every session the student attended
  const { name: studentName } = useCurrentSessionGroup(
    studentSessionGroups,
    StudentNameContext
  )

  return (
    <>
      <Box
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
        sx={{ p: 2 }}
      >
        <Printable docTitle={`Student Report - ${studentName}`}>
          <DefaultHeader props={{ mt: 0 }}>{studentName}</DefaultHeader>
          <DefaultAccordionGroup
            labels={["Overview of Joven Health Services"]}
            nodes={[<OverviewSection />]}
            defaultExpanded={[true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default StudentReport
