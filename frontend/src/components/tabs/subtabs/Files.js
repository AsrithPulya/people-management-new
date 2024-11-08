import React, { useState } from 'react';

export const Files = () => {
  const [files, setFiles] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const filteredFiles = uploadedFiles.filter(file =>
      ['image/jpeg', 'application/pdf', 'application/msword'].includes(file.type)
    );
    setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
  };

  // Function to handle file deletion
  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Function to handle file modification
  const handleModify = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  // Function to update file on modification
  const handleFileModify = (event, index) => {
    const modifiedFile = event.target.files[0];
    if (modifiedFile && ['image/jpeg', 'application/pdf', 'application/msword'].includes(modifiedFile.type)) {
      setFiles(prevFiles => prevFiles.map((file, i) => (i === index ? modifiedFile : file)));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>File Upload</h2>
      <input
        type="file"
        onChange={handleFileUpload}
        multiple
        accept=".jpg,.jpeg,.png,.pdf,.doc"
        style={styles.uploadInput}
      />
      
      <h3 style={styles.subHeading}>Uploaded Files</h3>
      <ul style={styles.fileList}>
        {files.map((file, index) => (
          <li key={index} style={styles.fileItem}>
            <span style={styles.fileName}>{file.name}</span>
            <button style={styles.viewButton} onClick={() => window.open(URL.createObjectURL(file))}>View</button>
            <button style={styles.deleteButton} onClick={() => handleDelete(index)}>Delete</button>
            <button style={styles.modifyButton} onClick={() => handleModify(index)}>Modify</button>
            <input
              type="file"
              id={`fileInput-${index}`}
              onChange={(e) => handleFileModify(e, index)}
              style={{ display: 'none' }}
              accept=".jpg,.pdf,.doc"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
  },
  subHeading: {
    color: '#666',
    marginTop: '20px',
  },
  uploadInput: {
    display: 'block',
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  fileName: {
    flexGrow: 1,
    marginRight: '10px',
    fontSize: '16px',
  },
  viewButton: {
    padding: '6px 12px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '6px 12px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f44336',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  modifyButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ffa500',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
