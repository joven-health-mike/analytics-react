// Copyright 2022 Social Fabric, LLC

import { useCSVReader } from "react-papaparse"
import DefaultButton from "./mui/DefaultButton"
import { Box } from "@mui/material"

type CsvLoaderProps = {
  buttonText: string
  csvData: string[][]
  setCsvData: (data: string[][]) => void
}

const CsvLoader: React.FC<CsvLoaderProps> = ({
  buttonText,
  csvData,
  setCsvData,
}) => {
  const { CSVReader } = useCSVReader()

  return (
    <>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setCsvData(results.data)
        }}
      >
        {({ getRootProps, ProgressBar, getRemoveFileProps }: any) => {
          return (
            <>
              {(!csvData || csvData.length === 0) && (
                <DefaultButton {...getRootProps()}>{buttonText}</DefaultButton>
              )}
              {csvData && csvData.length > 0 && (
                <Box sx={{ pt: 2, pb: 2 }}>
                  <DefaultButton
                    {...getRemoveFileProps()}
                    onClick={() => setCsvData([])}
                  >
                    Remove
                  </DefaultButton>
                </Box>
              )}
              <ProgressBar />
            </>
          )
        }}
      </CSVReader>
    </>
  )
}

export default CsvLoader
