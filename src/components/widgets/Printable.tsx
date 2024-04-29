// Copyright 2024 Social Fabric, LLC

import { ReactNode, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import DefaultButton from "./mui/DefaultButton"

type PrintableProps = {
  docTitle: string
  children: ReactNode
}

const Printable: React.FC<PrintableProps> = ({ docTitle, children }) => {
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
    documentTitle: docTitle,
  })
  return (
    <>
      <DefaultButton onClick={handlePrint}>Download PDF</DefaultButton>
      <div ref={componentRef}>{children}</div>
    </>
  )
}

export default Printable
