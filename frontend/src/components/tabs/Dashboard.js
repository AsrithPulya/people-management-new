import React from 'react';
import '../../../src/dashboard.css'; // Assume we add styling here

export const DashboardContent = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-item">
        <h3>Birthday</h3>
        <p>No birthdays today</p>
      </div>
      <div className="dashboard-item">
        <h3>New Hires</h3>
        <p>No New Joinees in past 15 days.</p>
      </div>
      <div className="dashboard-item">
        <h3>Favorites</h3>
        <p>No Favorites found.</p>
      </div>
      <div className="dashboard-item">
        <h3>Quick Links</h3>
        <p>No quick links</p>
      </div>
      <div className="dashboard-item">
        <h3>Announcements</h3>
        <p>No Announcement</p>
      </div>
      <div className="dashboard-item leave-report">
        <h3>Leave Report</h3>
        <ul>
          <li>Leave Without Pay</li>
          <li>Personal Leave - Available 3 Day(s)</li>
          <li>Sick Leave - Available 2 Day(s)</li>
          <li>Work From Home - Available 5 Day(s)</li>
        </ul>
      </div>
      <div className="dashboard-item">
        <h3>Upcoming Holidays</h3>
        <p>No upcoming holidays</p>
      </div>
      <div className="dashboard-item">
        <h3>My Pending Tasks</h3>
        <p>No pending tasks</p>
      </div>
    </div>
  );
};
