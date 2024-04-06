// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import ProviderReport from "../reports/ProviderReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import useNamesWithSelector from "../hooks/NamesWithSelector"
import { ProviderNameContext } from "../../data/providers/providers"

const ProviderReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  const { providerSessionGroups } = useContext(SessionsContext)
  const {
    selected: selectedProvider,
    setSelected: setSelectedProvider,
    names: providerNames,
  } = useNamesWithSelector(providerSessionGroups)

  return (
    <>
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
