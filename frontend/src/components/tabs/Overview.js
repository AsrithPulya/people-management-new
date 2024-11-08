import React, { useState } from "react";
import {
  Activities,
  Approvals,
  Feeds,
  Files,
  Leave,
  Profile,
  RelatedData,
} from "./subtabs/index";

export const Overview = () => {
  const [activeTab, setActiveTab] = useState("Activities");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Activities":
        return <Activities />;
      case "Approvals":
        return <Approvals />;
      case "Feeds":
        return <Feeds />;
      case "Files":
        return <Files />;
      case "Leave":
        return <Leave />;
      case "Profile":
        return <Profile />;
      case "RelatedData":
        return <RelatedData />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fa" }}>
      <div
        style={{
          backgroundImage:
            "url(https://static.zohocdn.com/zp5/people5/images/home/ms-bg0.60f9344acf91cb5cee8c8e02de6895ef.jpg)",
          backgroundSize: "cover",
          padding: "20px",
          borderRadius: "8px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <img
          src="https://people.zoho.com/cronlabs/viewPhoto?erecno=793577000000772087&mode=2&avatarid=3"
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "2px solid #fff",
            marginBottom: "10px",
          }}
        />
        <h2>HRM42 - Hariharan K</h2>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
          }}
        >
          <div className="c-pointer" onClick={() => setActiveTab("Activities")}>Activities</div>
          <div className="c-pointer" onClick={() => setActiveTab("Feeds")}>Feeds</div>
          <div className="c-pointer" onClick={() => setActiveTab("Profile")}>Profile</div>
          <div className="c-pointer" onClick={() => setActiveTab("Approvals")}>Approvals</div>
          <div className="c-pointer" onClick={() => setActiveTab("Leave")}>Leave</div>
          <div className="c-pointer" onClick={() => setActiveTab("Files")}>Files</div>
          <div className="c-pointer" onClick={() => setActiveTab("RelatedData")}>Related Data</div>
        </div>

        <div style={{ marginTop: "20px" }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
