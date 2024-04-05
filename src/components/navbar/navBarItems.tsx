// Copyright 2022 Social Fabric, LLC

import { ReactElement } from "react"
import {
  FaChartLine,
  FaChild,
  FaHome,
  FaPersonBooth,
  FaWizardsOfTheCoast,
} from "react-icons/fa"
import styled from "styled-components"
import image from "../../assets/Logo-192sq-alphabg.png"

const Image = styled.img`
  height: 19px;
  width: 19px;
`

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

export const allNavItems: NavItem[] = [
  {
    title: "Joven Health",
    icon: <Image src={image} alt="logo" />,
    path: "/",
    shouldDisplay: always,
  },
  {
    title: "Home",
    icon: <FaHome />,
    path: "/",
    shouldDisplay: always,
  },
  {
    title: "Joven Health Report",
    icon: <FaChartLine />,
    path: "/joven",
    shouldDisplay: ifSessionsExist,
  },
  {
    title: "Customer Report",
    icon: <FaPersonBooth />,
    path: "/customer",
    shouldDisplay: ifSessionsExist,
  },
  {
    title: "Provider Report",
    icon: <FaWizardsOfTheCoast />,
    path: "/provider",
    shouldDisplay: ifSessionsExist,
  },
  {
    title: "Student Report",
    icon: <FaChild />,
    path: "/student",
    shouldDisplay: ifSessionsExist,
  },
]
