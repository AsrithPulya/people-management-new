import React, { useState } from 'react';
import '../ApplyLeave.css';

function ApplyLeaveModal({ isOpen, onClose }) {
  const [leaveDayType, setLeaveDayType] = useState('Full day');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Apply Leave</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </header>
        <form className="apply-leave-form">
          <div className="form-group">
            <label>Leave Type *</label>
            <select required>
              <option value="">Select</option>
              {/* Leave type should reflect from DB */}
            </select>
          </div>
          <div className="form-group">
            <label>Start Date *</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>End Date *</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Leave Day Type *</label>
            <select 
              value={leaveDayType} 
              onChange={(e) => setLeaveDayType(e.target.value)}
              required
            >
              <option value="Full day">Full day</option>
              <option value="Half day">Half day</option>
            </select>
          </div>
          {leaveDayType === 'Half day' && (
            <div className="form-group">
              <label>Half Day *</label>
              <select required>
                <option value="First half">First half</option>
                <option value="Second half">Second half</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Reporting Manager Email ID *</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Reason for Leave</label>
            <textarea required></textarea>
          </div>
          <div className="form-group">
            <label>Status</label>
            <input type="text" value="Pending" disabled />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeaveModal;
