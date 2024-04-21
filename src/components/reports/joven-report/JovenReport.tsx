// Copyright 2022 Social Fabric, LLC

import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import AllHoursSection from "./AllHoursSection"
import AllNoShowSection from "./AllNoShowSection"
import { SessionsContext } from "../../../data/providers/SessionProvider"
import React, { useContext } from "react"
import AllProvidersSection from "./AllProvidersSection"

const PDF_DOWNLOAD_FILENAME = "Joven Health Analytics"

const JovenReport: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)

  return (
    <>
      <Box
        sx={{ m: 2 }}
        flexDirection={"column"}
        justifyContent="center"
        display="flex"
      >
        <Printable docTitle={`${PDF_DOWNLOAD_FILENAME}.pdf`}>
          <DefaultAccordionGroup
            labels={["Hours Delivered", "No-Show Rates", "Provider Hours"]}
            nodes={[
              <AllHoursSection sessionGroups={customerSessionGroups} />,
              <AllNoShowSection />,
              <AllProvidersSection />,
            ]}
            defaultExpanded={[false, false, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
