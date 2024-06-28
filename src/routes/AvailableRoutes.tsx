// Copyright 2024 Social Fabric, LLC

import HomePage from "../components/pages/HomePage"
import CustomerReportPage from "../components/pages/CustomerReportPage"
import ProviderReportPage from "../components/pages/ProviderReportPage"
import StudentReportPage from "../components/pages/StudentReportPage"

export const AvailableRoutes = [
  { url: "/", element: <HomePage /> },
  { url: "/customer", element: <CustomerReportPage /> },
  { url: "/provider", element: <ProviderReportPage /> },
  { url: "/student", element: <StudentReportPage /> },
]
