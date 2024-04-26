// Copyright 2022 Social Fabric, LLC

import { useContext } from "react"
import DefaultHeader from "../widgets/mui/DefaultHeader"
import DefaultSelectInput from "../widgets/mui/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import CustomerReport from "../reports/customer-report/CustomerReport"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import useNamesWithSelector from "../hooks/NamesWithSelector"
import { CustomerNameContext } from "../../data/providers/providers"

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
