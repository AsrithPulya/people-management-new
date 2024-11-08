import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import NewHire from "./NewHire";
import "../dashboard.css";
import {
  Overview,
  DashboardContent,
  Announcements,
  Policies,
  EmployeeTree,
  DepartmentTree,
  DepartmentDirectory,
  BirthdayFolks,
  NewHires,
} from "./tabs/index";
import { Profile } from "./tabs/subtabs";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/"); // Redirect to login if no token
    }
  }, [navigate]);

  const [selectedPrimaryTab, setSelectedPrimaryTab] = useState("myspace");
  const [selectedSubTab, setSelectedSubTab] = useState("overview");

  useEffect(() => {
    const pathParts = location.pathname.split("/").slice(1); // ["myspace", "overview"] or ["organization", "announcements"]
    setSelectedPrimaryTab(pathParts[0] || "myspace");
    setSelectedSubTab(pathParts[1] || (pathParts[0] === "organization" ? "announcements" : "overview"));
  }, [location]);

  const handlePrimaryTabChange = (tab) => {
    setSelectedPrimaryTab(tab);
    const subTab = tab === "organization" ? "announcements" : "overview";
    navigate(`/${tab}/${subTab}`);
  };

  const handleSubTabChange = (subTab) => {
    setSelectedSubTab(subTab);
    navigate(`/${selectedPrimaryTab}/${subTab}`);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <nav>
            <ul className="top-nav-links">
              <li>
                <Link
                  to="/myspace"
                  className={`tab-link ${selectedPrimaryTab === "myspace" ? "active" : ""}`}
                  onClick={() => handlePrimaryTabChange("myspace")}
                >
                  My Space
                </Link>
              </li>
              <li>
                <Link
                  to="/organization"
                  className={`tab-link ${selectedPrimaryTab === "organization" ? "active" : ""}`}
                  onClick={() => handlePrimaryTabChange("organization")}
                >
                  Organization
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Secondary Navigation */}
        <div className="content">
          <ul className="d-flex mx-2 my-2">
            {selectedPrimaryTab === "myspace" && (
              <>
                <li className="pr-4">
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "overview" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("overview")}
                  >
                    Overview
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "dashboard" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("dashboard")}
                  >
                    Dashboard
                  </div>
                </li>
              </>
            )}
            {selectedPrimaryTab === "organization" && (
              <>
                <li className="pr-4">
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "announcements" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("announcements")}
                  >
                    Announcements
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "policies" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("policies")}
                  >
                    Policies
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "employeeTree" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("employeeTree")}
                  >
                    Employee Tree
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "departmentTree" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("departmentTree")}
                  >
                    Department Tree
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "departmentDirectory" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("departmentDirectory")}
                  >
                    Department Directory
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "birthdayFolks" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("birthdayFolks")}
                  >
                    Birthday Folks
                  </div>
                </li>
                <li>
                  <div
                    className={`c-pointer tab-link ${selectedSubTab === "newHires" ? "active" : ""}`}
                    onClick={() => handleSubTabChange("newHires")}
                  >
                    New Hires
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Render the appropriate component based on the selected primary and sub-tabs */}
        <div className="tab-content mx-2 my-2">
          <Routes>
            <Route path="myspace/overview" element={<Overview />} />
            <Route path="myspace/dashboard" element={<DashboardContent />} />
            <Route path="myspace/overview" element={<Profile />} />
            <Route path="organization/announcements" element={<Announcements />} />
            <Route path="organization/policies" element={<Policies />} />
            <Route path="organization/employeeTree" element={<EmployeeTree />} />
            <Route path="organization/departmentTree" element={<DepartmentTree />} />
            <Route path="organization/departmentDirectory" element={<DepartmentDirectory />} />
            <Route path="organization/birthdayFolks" element={<BirthdayFolks />} />
            <Route path="organization/newHires" element={<NewHires />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
