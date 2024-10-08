// Copyright 2024 Social Fabric, LLC

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useEffect, useState } from "react"

type DefaultMultiSelectInputProps = {
  label?: string
  items: string[]
  defaultSelectAll: boolean
  onItemsSelected?: (item: string[]) => void
}

const DefaultMultiSelectInput: React.FC<DefaultMultiSelectInputProps> = ({
  label = "",
  items,
  defaultSelectAll = false,
  onItemsSelected = () => {},
}) => {
  const [selection, setSelection] = useState<string[]>([])
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
  const [clearChecked, setClearChecked] = useState<boolean>(false)
  const [defaultSelection, setDefaultSelection] = useState<string[]>([])

  useEffect(() => {
    const newDefaultSelection = defaultSelectAll ? [...items] : []
    setDefaultSelection(newDefaultSelection)
  }, [defaultSelectAll, items])

  useEffect(() => {
    setSelection(defaultSelection)
  }, [defaultSelection])

  const handleChange = (event: SelectChangeEvent<typeof selection>) => {
    const {
      target: { value },
    } = event

    const selectionValue = typeof value === "string" ? value.split(",") : value

    if (!selectAllChecked && selectionValue.includes("Select All")) {
      setSelectAllChecked(!selectAllChecked)
      setClearChecked(false)
      setSelection(items)
      return
    }
    if (!clearChecked && selectionValue.includes("Clear")) {
      setSelectAllChecked(false)
      setClearChecked(false)
      setSelection([])
      return
    }

    setSelectAllChecked(false)
    setSelection(selectionValue)
  }

  useEffect(() => {
    if (!selection) return
    onItemsSelected(
      selection.filter((item) => item !== "Select All" && item !== "Clear")
    )
  }, [selection.length])

  return (
    <>
      <Box justifyContent="center" display="flex">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={selection}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) =>
              selected &&
              selected
                .filter((item) => item !== "Select All" && item !== "Clear")
                .join(", ")
            }
          >
            <MenuItem key={"Select All"} value={"Select All"}>
              <Checkbox checked={selectAllChecked} />
              <ListItemText primary={"Select All"} />
            </MenuItem>
            <MenuItem key={"Clear"} value={"Clear"}>
              <Checkbox checked={clearChecked} />
              <ListItemText primary={"Clear"} />
            </MenuItem>
            {items.map(
              (item) =>
                selection && (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={selection.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default DefaultMultiSelectInput
