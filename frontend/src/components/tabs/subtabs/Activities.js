export const Activities = () => {
  return (
    <div>
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Department Members</h3>
          <p>No Data Found</p>
        </div>

        <div
          style={{
            flex: 2,
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <img
              src="https://roviasolutions.com/assets/img/zoho/webp/img7.webp"
              alt="Zoho Logo"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <strong>Good Evening, Hariharan K</strong>
            <p>Have a productive day!</p>
            <blockquote>
              "A real entrepreneur is somebody who has no safety net underneath
              them." - Henry Kravis
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
