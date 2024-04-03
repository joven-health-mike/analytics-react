// Copyright 2022 Social Fabric, LLC

import React from "react"
import PrivateRoutes from "./PrivateRoutes"
import HomePage from "../components/pages/HomePage"
import JovenReportPage from "../components/pages/JovenReportPage"
import CustomerReportPage from "../components/pages/CustomerReportPage"
import ProviderReportPage from "../components/pages/ProviderReportPage"

const AppRouter: React.FC = () => {
  return <PrivateRoutes />
}

export const AvailableRoutes = [
  { url: "/", element: <HomePage /> },
  { url: "/joven", element: <JovenReportPage /> },
  { url: "/customer", element: <CustomerReportPage /> },
  { url: "/provider", element: <ProviderReportPage /> },
]

export default AppRouter
