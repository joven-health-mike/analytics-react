// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import ProviderReport from "../reports/ProviderReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import { ProviderNameContext } from "../../data/providers/ProviderNameProvider"
import useNamesWithSelector from "../hooks/NamesWithSelector"

const ProviderReportPage: React.FC = () => {
  // TODO: This page is loading much slower than the other pages...
  useNavigateToHomeWhenSessionsCleared()
  const { providerSessionGroups } = useContext(SessionsContext)
  const {
    selected: selectedProvider,
    setSelected: setSelectedProvider,
    names: providerNames,
  } = useNamesWithSelector(providerSessionGroups)

  return (
    <>
      <Navbar />
      <DefaultHeader>Provider Report</DefaultHeader>
      <DefaultSelectInput
        label="Select a Provider"
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

export default ProviderReportPage
