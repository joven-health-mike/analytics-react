import HomePage from "../components/pages/HomePage"
import JovenReportPage from "../components/pages/JovenReportPage"
import CustomerReportPage from "../components/pages/CustomerReportPage"
import ProviderReportPage from "../components/pages/ProviderReportPage"
import StudentReportPage from "../components/pages/StudentReportPage"
import DemographicsPage from "../components/pages/DemographicsPage"

export const AvailableRoutes = [
  { url: "/", element: <HomePage /> },
  { url: "/joven", element: <JovenReportPage /> },
  { url: "/customer", element: <CustomerReportPage /> },
  { url: "/provider", element: <ProviderReportPage /> },
  { url: "/student", element: <StudentReportPage /> },
  { url: "/demographics", element: <DemographicsPage /> },
]
