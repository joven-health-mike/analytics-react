// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import { Box } from "@mui/material"
import DefaultAccordionGroup from "../widgets/DefaultAccordionGroup"
import Printable from "../widgets/Printable"
import useCurrentSessionGroup from "../hooks/CurrentSessionGroup"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { StudentNameContext } from "../../data/providers/StudentNameProvider"

const StudentReport: React.FC = () => {
  const { studentSessionGroups } = useContext(SessionsContext)
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
            labels={[]}
            nodes={[]}
            defaultExpanded={[true, true]}
          />
        </Printable>

        <Box sx={{ mb: 2 }}></Box>
      </Box>
    </>
  )
}

export default StudentReport
