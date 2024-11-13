import React, { useState } from "react"
import {
  Menu,
  X,
  Home,
  FileEdit,
  Calculator,
  BarChart2,
  FileText,
  UserPlus,
  FileQuestion,
  AlertTriangle,
  User
} from "lucide-react"

const menuItems = [
  { icon: Home, label: "My Plan", path: "/" },
  { icon: FileEdit, label: "Edit My Plan", path: "/edit" },
  { icon: Calculator, label: "Assumptions", path: "/assumptions" },
  { icon: BarChart2, label: "Income Tax Brackets", path: "/income-tax" },
  { icon: BarChart2, label: "Estate Tax Brackets", path: "/estate-tax" },
  { icon: UserPlus, label: "Refer a Friend", path: "/refer" },
  { icon: FileText, label: "Terms & Conditions", path: "/terms" },
  { icon: FileQuestion, label: "Disclaimer", path: "/disclaimer" }
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("My Plan")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Retirerighht
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Luffy</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Overlay Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Menu</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      setActiveItem(item.label)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                      activeItem === item.label
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
