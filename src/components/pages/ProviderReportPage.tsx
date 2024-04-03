// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import ProviderReport from "../data-widgets/ProviderReport"

const ProviderReportPage: React.FC = () => {
  const { providerSessionGroups } = useContext(SessionsContext)
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [providerNames, setProviderNames] = useState<string[]>([])

  useEffect(() => {
    const newCustomerNames = [...providerSessionGroups.names()]
    if (newCustomerNames.length === 0) {
      setSelectedProvider("")
      setProviderNames([])
      return
    }
    if (selectedProvider === undefined) {
      setSelectedProvider(newCustomerNames[0])
    } else if (
      selectedProvider.length > 0 &&
      !newCustomerNames.join().includes(selectedProvider)
    ) {
      setSelectedProvider(newCustomerNames[0])
    }
    setProviderNames(newCustomerNames)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerSessionGroups])

  return (
    <>
      <Navbar />
      <DefaultHeader>Customer Report</DefaultHeader>
      <DefaultSelectInput
        label="Select a Customer"
        items={providerNames}
        enableSelectAll={false}
        onItemSelected={(item) => {
          setSelectedProvider(item)
        }}
      />
      <ProviderNameContext.Provider value={selectedProvider}>
        <ProviderReport />
      </ProviderNameContext.Provider>
    </>
  )
}

export const ProviderNameContext = React.createContext<string>("")

export default ProviderReportPage
