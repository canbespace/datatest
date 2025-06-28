import React from "react";

const UserTable = ({ users, updateRole, banUser, deleteUser, formatTime }) => (
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Role</th>
        <th>Last Login</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{formatTime(user.lastLogin)}</td>
          <td>
            <select
              value={user.role}
              onChange={(e) => updateRole(user._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={() => banUser(user._id)}>Ban</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
