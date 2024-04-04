// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import DefaultHeader from "../widgets/DefaultHeader"
import CustomerReport from "../data-widgets/CustomerReport"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import { SessionsContext } from "../../data/providers/SessionProvider"
import useNavigateToHomeWhenSessionsCleared from "../hooks/NavigateToHome"
import { CustomerNameContext } from "../../data/providers/CustomerNameProvider"

const CustomerReportPage: React.FC = () => {
  useNavigateToHomeWhenSessionsCleared()
  const { customerSessionGroups } = useContext(SessionsContext)
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")
  const [customerNames, setCustomerNames] = useState<string[]>([])

  useEffect(() => {
    const newCustomerNames = [...customerSessionGroups.names()]
    if (selectedCustomer === undefined) {
      setSelectedCustomer(newCustomerNames[0])
    } else if (
      selectedCustomer.length > 0 &&
      !newCustomerNames.join().includes(selectedCustomer)
    ) {
      setSelectedCustomer(newCustomerNames[0])
    }
    setCustomerNames(newCustomerNames)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerSessionGroups])

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
