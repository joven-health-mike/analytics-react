import { useContext } from "react"
import UploadDataWidget from "./UploadDataWidget"
import { SessionsContext } from "../../data/providers/SessionProvider"
import { createSession } from "../../data/models/Session"
import { createItemsFromCsv } from "../../utils/CsvUtils"
import useSessionsPopulated from "../hooks/SessionsPopulated"

const UploadServiceDataWidget: React.FC = () => {
  const { setSessions } = useContext(SessionsContext)
  const { sessionsPopulated } = useSessionsPopulated()

  return (
    <>
      <UploadDataWidget
        prompt="Upload Service Data"
        subPrompt="Service data can be uploaded in either SAD or TeleTeachers format. Select the appropriate format below."
        button1Text={"Upload SAD Format"}
        hasData={sessionsPopulated}
        onDataLoaded={(data: string[][]) => {
          createItemsFromCsv(data, setSessions, createSession)
        }}
        onDataCleared={() => {
          setSessions([])
        }}
      />
    </>
  )
}

export default UploadServiceDataWidget
