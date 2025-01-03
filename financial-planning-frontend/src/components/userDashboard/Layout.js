import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  FileEdit,
  Calculator,
  BarChart2,
  FileText,
  UserPlus,
  FileQuestion,
  AlertTriangle,
  User,
} from "lucide-react";
import UserProfile from "./UserProfile"; // Import the UserProfile component
import axios from "axios";

const menuItems = [
  { icon: Home, label: "My Plan", path: "/user-dashboard" },
  { icon: FileEdit, label: "Edit My Plan", path: "/edit" },
  { icon: Calculator, label: "Assumptions", path: "/user-dashboard" },
  { icon: BarChart2, label: "Income Tax Brackets", path: "https://taxfoundation.org/data/all/federal/2025-tax-brackets/" },
  { icon: BarChart2, label: "Estate Tax Brackets", path: "https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax" },
  
  { icon: UserPlus, label: "Refer a Friend", path: "/user-dashboard" },
  { icon: FileText, label: "Terms & Conditions", path: "/user-dashboard" },
  { icon: FileQuestion, label: "Disclaimer", path: "/user-dashboard" },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("My Plan");
  const [profileOpen, setProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    lastUpdated: "",
  });

  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  // Fetch user info including lastUpdated
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          lastUpdated: response.data.lastUpdated,
        });
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUserInfo();
  }, [profileOpen]);

  // Close sidebar or profile modal when clicking outside
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      sidebarOpen
    ) {
      setSidebarOpen(false);
    }
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target) &&
      profileOpen
    ) {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, profileOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop */}
      {(sidebarOpen || profileOpen) && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity z-40" />
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
      {/* Calc Page Navigation */}
      <a 
        href="/calc" 
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Calc Page
      </a>
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => setProfileOpen(true)}
      >
        <span className="text-sm font-medium text-gray-700">
          {userInfo.name || "Loading..."}
        </span>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600" />
        </div>
      </div>
    </div>
  </div>
</header>


      {/* Sidebar */}
      <aside
        ref={sidebarRef}
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
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setActiveItem(item.label);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                      activeItem === item.label
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div ref={profileRef} className="bg-white rounded-lg shadow-lg p-6 w-96">
            <UserProfile
              email={userInfo.email}
              lastUpdated={userInfo.lastUpdated}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
