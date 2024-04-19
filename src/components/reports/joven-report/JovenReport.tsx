// Copyright 2022 Social Fabric, LLC

import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import AllHoursSection from "./AllHoursSection"
import AllNoShowSection from "./AllNoShowSection"

const PDF_DOWNLOAD_FILENAME = "Joven Health Analytics"

const JovenReport: React.FC = () => {
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
            labels={["Hours Delivered", "No-Show Rates"]}
            nodes={[<AllHoursSection />, <AllNoShowSection />]}
            defaultExpanded={[true, true, true, true, true, true, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
