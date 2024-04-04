import React, { useContext } from "react"
import UploadDataWidget from "../widgets/UploadDataWidget"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { createSession } from "../../data/Session"
import { adaptTeleTeachersData } from "../../utils/TeleTeachersAdapter"
import { createItemsFromCsv } from "../../utils/CsvUtils"

type ProviderReportUploadWidgetProps = {
  sessionDataAdapter?: (input: string[][]) => string[][]
}

const ProviderReportUploadWidget: React.FC<ProviderReportUploadWidgetProps> = ({
  sessionDataAdapter = adaptTeleTeachersData,
}) => {
  const { sessions, setSessions } = useContext(SessionsContext)

  return (
    <>
      <UploadDataWidget
        prompt="Upload Service Data"
        subPrompt="Service data can be uploaded in either SAD or TeleTeachers format. Select the appropriate format below."
        button1Text={"Upload SAD Format"}
        button2Text={"Upload TeleTeachers Format"}
        enableSecondOption={true}
        hasData={sessions.length > 0}
        onDataLoaded={(data: string[][]) => {
          createItemsFromCsv(data, setSessions, createSession)
        }}
        onDataCleared={() => {
          setSessions([])
        }}
        onData2Loaded={(data: string[][]) => {
          data = sessionDataAdapter ? sessionDataAdapter(data) : data
          createItemsFromCsv(data, setSessions, createSession)
        }}
        onData2Cleared={() => {
          setSessions([])
        }}
      />
    </>
  )
}

export default ProviderReportUploadWidget
