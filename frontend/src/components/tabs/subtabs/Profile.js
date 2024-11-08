import React from 'react';

const Profile = () => {
  // Inline styles for CSS-in-JS approach
  const styles = {
    profilePage: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    profileSection: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px',
      backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
      fontSize: '18px',
      color: '#333',
      marginBottom: '10px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '5px',
    },
    profileItem: {
      marginBottom: '10px',
    },
    label: {
      fontSize: '14px',
      color: '#606060',
      margin: 0,
    },
    value: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#333',
      margin: 0,
    },
  };

  return (
    <div style={styles.profilePage}>
      {/* Basic Information */}
      <div style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Basic Information</h2>
        <div style={styles.profileItem}>
          <p style={styles.label}>Employee ID</p>
          <p style={styles.value}>HRM42</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Name:</strong> Hariharan K</p>
        </div>
      </div>

      {/* Contact Information */}
      <div style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Contact Information</h2>
        <div style={styles.profileItem}>
          <p style={styles.label}>Email</p>
          <p style={styles.value}>hariharan.k@cron-labs.com</p>
        </div>
        <div style={styles.profileItem}>
          <p style={styles.label}>Mobile Number</p>
          <p style={styles.value}>91-8870515769</p>
        </div>
        <div style={styles.profileItem}>
          <p style={styles.label}>Work Phone Number</p>
          <p style={styles.value}>8870515769</p>
        </div>
        <div style={styles.profileItem}>
          <p style={styles.label}>Time Zone</p>
          <p style={styles.value}>(GMT+05:30)</p>
        </div>
      </div>

      {/* Work Information */}
      <div style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Work Information</h2>
        <div style={styles.profileItem}>
          <p style={styles.label}>Date of Joining</p>
          <p style={styles.value}>16-Oct-2024</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Zoho Role:</strong> Team member</p>
        </div>
      </div>

      {/* Personal Details */}
      <div style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Personal Details</h2>
        <div style={styles.profileItem}>
          <p><strong>Date of Birth:</strong> 11-Jul-2002</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Gender:</strong> Male</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Marital Status:</strong> Single</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Present Address:</strong> Nallurhalli, Whitefield, Bengaluru, Karnataka, INDIA, 560066</p>
        </div>
        <div style={styles.profileItem}>
          <p><strong>Permanent Address:</strong> 1/369, Amman Kovil Street, Kamarajar Puram, Idaikal, Tenkasi, Tamil Nadu, INDIA, 627804</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
