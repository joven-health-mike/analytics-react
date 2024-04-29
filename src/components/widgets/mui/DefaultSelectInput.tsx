// Copyright 2024 Social Fabric, LLC

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"

type DefaultSelectInputProps = {
  label: string
  items: string[]
  onItemSelected: (item: string) => void
  onAllSelected?: () => void
  enableSelectAll?: boolean
}

const DefaultSelectInput: React.FC<DefaultSelectInputProps> = ({
  label,
  items,
  onItemSelected,
  onAllSelected,
  enableSelectAll = true,
}) => {
  const defaultValue = useCallback(
    () => (items && items.length > 0 ? items[0] : ""),
    [items]
  )
  const [selection, setSelection] = useState<string>("")
  const itemElements = useMemo(() => {
    return items.map((item) => {
      return (
        <MenuItem value={item} key={item}>
          {item}
        </MenuItem>
      )
    })
  }, [items])

  useEffect(() => {
    if (selection === "") {
      setSelection(defaultValue())
    }
  }, [selection])

  useEffect(() => {
    if (
      enableSelectAll &&
      onAllSelected !== undefined &&
      selection === "Select All"
    ) {
      onAllSelected()
    } else if (selection !== "") {
      onItemSelected(selection)
    }
  }, [selection])

  return (
    <>
      <Box justifyContent="center" display="flex">
        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id={label.toLowerCase()}>{label}</InputLabel>
          <Select
            labelId={label.toLowerCase()}
            id={label.toLowerCase()}
            defaultValue={defaultValue()}
            value={selection}
            label={label}
            onChange={(e: SelectChangeEvent<string>) => {
              setSelection(e.target.value)
            }}
          >
            {enableSelectAll && (
              <MenuItem value={"Select All"}>{"Select All"}</MenuItem>
            )}
            {itemElements}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default DefaultSelectInput
