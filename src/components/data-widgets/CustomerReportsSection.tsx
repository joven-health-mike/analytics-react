// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from "react"
import DefaultHeader from "../widgets/DefaultHeader"
import DefaultSelectInput from "../widgets/DefaultSelectInput"
import CustomerReport from "./CustomerReport"
import { SessionsContext } from "../../data/providers/SessionProvider"

const CustomerReportsSection: React.FC = () => {
  const { customerSessionGroups } = useContext(SessionsContext)
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")

  return (
    <>
      <>
        {customerSessionGroups && (
          <>
            <DefaultHeader>Customer Reports</DefaultHeader>
            <DefaultSelectInput
              label="Select a Customer"
              items={[...customerSessionGroups.names()]}
              enableSelectAll={false}
              onItemSelected={(item) => {
                setSelectedCustomer(item)
              }}
            />
            {selectedCustomer !== "" && (
              <>
                <CustomerReport customerName={selectedCustomer} />
              </>
            )}
          </>
        )}
      </>
    </>
  )
}

export default CustomerReportsSection
