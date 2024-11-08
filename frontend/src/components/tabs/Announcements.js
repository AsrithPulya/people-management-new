import "../../../src/dashboard.css"

export const Announcements = () => {
  return (
    <div className="dashboard-container d-flex justify-content-center">
      <div className="card">
        <img 
          src="https://www.shutterstock.com/image-vector/no-megaphone-speaker-prohibition-sign-600w-740515516.jpg" 
          alt="No Announcement" 
          style={{ width: '100px', height: '100px' }} // Adjust size as needed
        />
        <p>No Announcement</p>
      </div>
    </div>
  );
};
