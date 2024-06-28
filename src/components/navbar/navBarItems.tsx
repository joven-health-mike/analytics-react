// Copyright 2024 Social Fabric, LLC

import { ReactElement } from "react"
import { FaAddressCard, FaHome, FaSchool, FaUserMd } from "react-icons/fa"
import image from "../../assets/Logo-192sq-alphabg.png"

export type NavItem = {
  title: string
  icon: ReactElement
  path: string
  shouldDisplay: (
    sessionsLength: number,
    studentSessionGroupsLength: number
  ) => boolean
}

// should display convenience functions
const always = () => true
const ifSessionsExist = (sessionsLength: number) => sessionsLength > 0
const ifStudentSessionsExist = (_: number, studentSessionsLength: number) =>
  studentSessionsLength > 0

export const allNavItems: NavItem[] = [
  {
    title: "",
    icon: <img src={image} alt="logo" height={"19px"} width={"19px"} />,
    path: "https://jovenhealth.com/",
    shouldDisplay: always,
  },
  {
    title: "Home",
    icon: <FaHome />,
    path: "/",
    shouldDisplay: always,
  },
  {
    title: "Customer Report",
    icon: <FaSchool />,
    path: "/customer",
    shouldDisplay: ifSessionsExist,
  },
  {
    title: "Provider Report",
    icon: <FaUserMd />,
    path: "/provider",
    shouldDisplay: ifSessionsExist,
  },
  {
    title: "Student Report",
    icon: <FaAddressCard />,
    path: "/student",
    shouldDisplay: ifStudentSessionsExist,
  },
]
