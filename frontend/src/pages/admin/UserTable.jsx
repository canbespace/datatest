// props: users = [{ _id, email, role, lastLogin }]
<Table>
  <thead>...</thead>
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
          />
          <button onClick={() => banUser(user._id)}>Ban</button>
          <button onClick={() => deleteUser(user._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>;
