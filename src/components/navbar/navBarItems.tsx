// Copyright 2022 Social Fabric, LLC

import React, { ReactElement } from "react"
import { FaChartLine, FaHome } from "react-icons/fa"
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
  shouldDisplay: (sessionsLength: number) => boolean
}

export const allNavItems: NavItem[] = [
  {
    title: "Joven Health",
    icon: <Image src={image} alt="logo" />,
    path: "/",
    shouldDisplay: () => true,
  },
  {
    title: "Home",
    icon: <FaHome />,
    path: "/",
    shouldDisplay: () => true,
  },
  {
    title: "Analytics",
    icon: <FaChartLine />,
    path: "/analytics",
    shouldDisplay: (sessionsLength) => sessionsLength > 0,
  },
]
