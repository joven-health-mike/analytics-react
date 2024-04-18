// Copyright 2022 Social Fabric, LLC

import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import CustomerNoShowSection from "./CustomerNoShowSection"
import ProviderNoShowSection from "./ProviderNoShowSection"
import AllHoursSection from "./AllHoursSection"

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
            labels={[
              "Total Hours Delivered",
              "No-Show Rates by Customer",
              "No-Show Rates by Provider",
            ]}
            nodes={[
              <AllHoursSection />,
              <CustomerNoShowSection />,
              <ProviderNoShowSection />,
            ]}
            defaultExpanded={[true, true, true, true, true, true, true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default JovenReport
