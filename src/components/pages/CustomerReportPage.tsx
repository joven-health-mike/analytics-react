// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import CustomerReport from "../reports/CustomerReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import { CustomerNameContext } from "../../data/providers/CustomerNameProvider"
import useNamesWithSelector from "../hooks/NamesWithSelector"

const CustomerReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  const { customerSessionGroups } = useContext(SessionsContext)
  const {
    selected: selectedCustomer,
    setSelected: setSelectedCustomer,
    names: customerNames,
  } = useNamesWithSelector(customerSessionGroups)

  return (
    <>
      <Navbar />
      <DefaultHeader>Customer Report</DefaultHeader>
      <DefaultSelectInput
        label="Select a Customer"
        items={customerNames}
        enableSelectAll={false}
        onItemSelected={(item) => {
          setSelectedCustomer(item)
        }}
      />
      <CustomerNameContext.Provider value={selectedCustomer}>
        <CustomerReport />
      </CustomerNameContext.Provider>
    </>
  )
}

export default CustomerReportPage
