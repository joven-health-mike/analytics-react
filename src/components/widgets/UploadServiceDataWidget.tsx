// Copyright 2024 Social Fabric, LLC

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
        prompt="Upload"
        subPrompt="Select your data export file to upload."
        button1Text={"Upload"}
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
