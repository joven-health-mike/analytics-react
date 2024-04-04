import HomePage from "../components/pages/HomePage"
import JovenReportPage from "../components/pages/JovenReportPage"
import CustomerReportPage from "../components/pages/CustomerReportPage"
import ProviderReportPage from "../components/pages/ProviderReportPage"

export const AvailableRoutes = [
  { url: "/", element: <HomePage /> },
  { url: "/joven", element: <JovenReportPage /> },
  { url: "/customer", element: <CustomerReportPage /> },
  { url: "/provider", element: <ProviderReportPage /> },
]
