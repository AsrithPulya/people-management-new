import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ApplyLeave.css';

function ApplyLeaveModal({ isOpen, onClose }) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveDayType, setLeaveDayType] = useState('Full day');
  const [halfDay, setHalfDay] = useState('First half');
  const [managerId, setManagerId] = useState(null);
  const [reason, setReason] = useState('');
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      //Accessing the access_token from the Local Storage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('You are not logged in.');
        onClose();
        return;
      }

      // Fetch leave types for the drop down part
      axios.get('http://127.0.0.1:8000/api/leave-types/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave types:", error);
        alert('Failed to fetch leave types. Please try again.');
      });

      // Fetch logged-in employee data, for getting the Employee_id automatically
      axios.get('http://127.0.0.1:8000/api/employees/me/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { id, user } = response.data;
        setEmployeeId(id);

        //Fetching the Reporting manager ID Automatically
        return axios.get(`http://127.0.0.1:8000/accounts/users/${user}/`, {  
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((userResponse) => {
        const { reporting_manager } = userResponse.data;
        if (reporting_manager) {
          setManagerId(reporting_manager);
        } else {
          alert('No reporting manager found for this user.');
          onClose();
        }
      })
      .catch((error) => {
        console.error("Error fetching employee or manager data:", error);
        alert('Failed to fetch employee or manager data. Please log in again.');
        onClose();
      });
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log all form values - for Debugging purpose
    console.log("Submitting leave request with the following data:");
    console.log("Employee ID:", employeeId);
    console.log("Leave Type:", leaveType);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Leave Day Type:", leaveDayType);
    console.log("Half Day:", halfDay);
    console.log("Manager ID:", managerId);
    console.log("Reason for Leave:", reason);

    //Debugging to check for any missing IDs
    if (!employeeId) {
      alert('Employee ID is missing. Please try again later.');
      return;
    }

    if (!managerId) {
      alert('Manager ID is missing. Please try again later.');
      return;
    }

    //Logic for Start Date and End Date
    if (new Date(startDate) > new Date(endDate)) {
      alert('End date must be after start date.');
      return;
    }

    
    try {
      const token = localStorage.getItem('accessToken');
      //To handle the scnario where the access token is not present
      if (!token) {
        alert('You are not authorized. Please log in again.');
        onClose();
        return;
      }
      //POST request using Axios to apply for a Leave
      const response = await axios.post(
        'http://127.0.0.1:8000/api/leave-requests/apply/',
        {
          employee: employeeId,
          leave_type: leaveType,
          start_date: startDate,
          end_date: endDate,
          leave_day_type: leaveDayType,
          half_day: leaveDayType === 'Half day' ? halfDay : null,
          reporting_manager: managerId,
          reason_for_leave: reason,
          status: 'Pending',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //Upon Raising a succesfull Leave Request
      if (response.status === 201) {
        alert('Leave request submitted successfully!');
        onClose();
      } 
      //Upon Raising a falied Leave Request
      else {
        alert('Failed to submit leave request. Please try again.');
      }
    }
    //Exception Handling
     catch (error) {
      console.error("Error submitting leave request:", error.response ? error.response.data : error);
      alert('Failed to submit leave request.');
    }
  };

  if (!isOpen) return null;

  //MAIN FRONTEND COMPONENT
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Apply Leave</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </header>
        <form className="apply-leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Leave Type *</label>
            <select 
              value={leaveType} 
              onChange={(e) => setLeaveType(e.target.value)} 
              required
            >
              <option value="">Select</option>
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.leavename}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Start Date *</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>End Date *</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Leave Day Type *</label>
            <select value={leaveDayType} onChange={(e) => setLeaveDayType(e.target.value)} required>
              <option value="Full day">Full day</option>
              <option value="Half day">Half day</option>
            </select>
          </div>
          {leaveDayType === 'Half day' && (
            <div className="form-group">
              <label>Half Day *</label>
              <select value={halfDay} onChange={(e) => setHalfDay(e.target.value)} required>
                <option value="First half">First half</option>
                <option value="Second half">Second half</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Reason for Leave</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">Apply Leave</button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeaveModal;
