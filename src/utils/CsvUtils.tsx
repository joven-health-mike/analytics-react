// Copyright 2024 Social Fabric, LLC

export const downloadCsv = (dataStr: string, filename: string) => {
  const blob = new Blob([dataStr], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const createItemsFromCsv = <T,>(
  data: string[][],
  setData: (data: T[]) => void,
  createItem: (datum: string[]) => T
) => {
  // call factory method on every item, skipping the 1st line of headers
  const newData: T[] = data.slice(1).map((datum) => createItem(datum))
  setData(newData)
}

export const makeCSVSafe = (input: string) => {
  // If the string contains double quotes, escape them by doubling them up
  let output = input
    .replace(/"/g, '""')
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, " ")

  // If the string contains commas, double quotes, or line breaks, enclose it within double quotes
  if (output.includes(",") || output.includes('"') || output.includes("\n")) {
    output = '"' + output + '"'
  }

  return output.trim()
}
