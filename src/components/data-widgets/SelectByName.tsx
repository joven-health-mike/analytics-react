// Copyright 2022 Social Fabric, LLC

import React from "react"
import DefaultMultiSelectInput from "../widgets/DefaultMultiSelectInput"

type SelectByNameProps = {
  label?: string
  names: string[]
  defaultSelectAll?: boolean
  onFilterUpdated?: (newFilter: string[]) => void
}

const SelectByName: React.FC<SelectByNameProps> = ({
  label = "",
  names,
  defaultSelectAll = false,
  onFilterUpdated = () => {},
}) => {
  return (
    <>
      <DefaultMultiSelectInput
        label={label}
        items={names}
        defaultSelectAll={defaultSelectAll}
        onItemsSelected={(items) => {
          onFilterUpdated([...items])
        }}
      />
    </>
  )
}

export default SelectByName
