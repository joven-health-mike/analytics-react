// Copyright 2022 Social Fabric, LLC

import { useCSVReader } from "react-papaparse"
import DefaultButton from "./mui/DefaultButton"

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
              <DefaultButton {...getRootProps()}>{buttonText}</DefaultButton>
              {csvData && csvData.length > 0 && (
                <>
                  <DefaultButton
                    {...getRemoveFileProps()}
                    onClick={() => setCsvData([])}
                  >
                    Remove
                  </DefaultButton>
                </>
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
