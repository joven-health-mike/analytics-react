// Copyright 2024 Social Fabric, LLC

import { Box } from "@mui/material"
import DefaultAccordionGroup from "../../widgets/mui/DefaultAccordionGroup"
import Printable from "../../widgets/Printable"
import OverviewSection from "./OverviewSection"

const PDF_DOWNLOAD_FILENAME = "Joven Health Demographics Report"

const DemographicsReport: React.FC = () => {
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
            labels={["Overview Section"]}
            nodes={[<OverviewSection />]}
            defaultExpanded={[true]}
          />
        </Printable>
      </Box>
    </>
  )
}

export default DemographicsReport
