import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import NewHire from "./NewHire";
import {
  Announcements,
  Policies,
  EmployeeTree,
  DepartmentTree,
  DepartmentDirectory,
  BirthdayFolks,
} from "./tabs/index";
import "../dashboard.css";

function Organization() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("announcements");
  const [selectedPrimaryTab, setSelectedPrimaryTab] = useState("organization");
  const [selectedSubTab, setSelectedSubTab] = useState("announcements"); // Add this state

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate]);

  const handlePrimaryTabChange = (tab) => {
    setSelectedPrimaryTab(tab);
    if (tab === "organization") {
      navigate("/organization");
    } else {
      navigate("/myspace");
    }
  };

  const handleSubTabChange = (tab) => {
    setSelectedSubTab(tab);
  };

  const renderContent = () => {
    switch (selectedSubTab) {
      case "announcements":
        return <Announcements />;
      case "policies":
        return <Policies />;
      case "employeeTree":
        return <EmployeeTree />;
      case "departmentTree":
        return <DepartmentTree />;
      case "departmentDirectory":
        return <DepartmentDirectory />;
      case "birthdayFolks":
        return <BirthdayFolks />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <header className="top-nav">
          <nav>
            <ul className="top-nav-links">
              <li>
                <div
                  className={`tab-link ${
                    selectedPrimaryTab === "myspace" ? "active" : ""
                  }`}
                  onClick={() => handlePrimaryTabChange("myspace")}
                >
                  My Space
                </div>
              </li>
              <li>
                <div
                  className={`tab-link ${
                    selectedPrimaryTab === "organization" ? "active" : ""
                  }`}
                  onClick={() => handlePrimaryTabChange("organization")}
                >
                  Organization
                </div>
              </li>
            </ul>
          </nav>
        </header>
        <div className="d-flex flex-column">
          <ul className="tab-container">
            <li className="pr-4">
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "announcements" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("announcements")}
              >
                Announcements
              </div>
            </li>
            <li>
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "policies" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("policies")}
              >
                Policies
              </div>
            </li>
            <li>
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "employeeTree" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("employeeTree")}
              >
                Employee Tree
              </div>
            </li>
            <li>
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "departmentTree" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("departmentTree")}
              >
                Department Tree
              </div>
            </li>
            <li>
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "departmentDirectory" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("departmentDirectory")}
              >
                Department Directory
              </div>
            </li>
            <li>
              <div
                className={`c-pointer tab-link ${
                  selectedSubTab === "birthdayFolks" ? "active" : ""
                }`}
                onClick={() => handleSubTabChange("birthdayFolks")}
              >
                Birthday Folks
              </div>
            </li>
          </ul>

          {/* Render the content based on selectedSubTab */}
          <div className="content-container">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Organization;
