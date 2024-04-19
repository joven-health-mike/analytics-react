import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import React from "react"

interface DefaultToggleButtonProps {
  selectionOptions: string[]
  onSelectionChanged: (selection: string) => void
}

const DefaultToggleButton: React.FC<DefaultToggleButtonProps> = ({
  selectionOptions,
  onSelectionChanged,
}) => {
  const [selection, setSelection] = React.useState<string | null>(null)

  const handleSelection = (
    _: React.MouseEvent<HTMLElement>,
    newSelection: string
  ) => {
    if (newSelection) {
      setSelection(newSelection)
      onSelectionChanged(newSelection)
    }
  }

  return (
    <ToggleButtonGroup value={selection} exclusive onChange={handleSelection}>
      {selectionOptions.map((option) => {
        return (
          <ToggleButton key={option} value={option} aria-label={option}>
            {option}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default DefaultToggleButton
