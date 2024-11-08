import React from 'react';
import './policies.css'; // Ensure you create this CSS file as well

export const Policies = () => {
  // Sample data for the table
  const policiesData = [
    {
      name: 'Policy A',
      sharedWith: 'User 1',
      folder: 'Folder 1',
      updatedOn: '2024-11-01',
      actions: 'Edit | Delete',
    },
    {
      name: 'Policy B',
      sharedWith: 'User 2',
      folder: 'Folder 2',
      updatedOn: '2024-10-25',
      actions: 'Edit | Delete',
    },
    {
      name: 'Policy C',
      sharedWith: 'User 3',
      folder: 'Folder 3',
      updatedOn: '2024-11-03',
      actions: 'Edit | Delete',
    },
  ];

  return (
    <div className="policies">
      <h2>Policies</h2>
      <table className="policies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shared with</th>
            <th>Folder</th>
            <th>Updated on</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policiesData.map((policy, index) => (
            <tr key={index}>
              <td>{policy.name}</td>
              <td>{policy.sharedWith}</td>
              <td>{policy.folder}</td>
              <td>{policy.updatedOn}</td>
              <td>{policy.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
