import { useEffect, useState } from "react";
import API from "../services/api";

const Users = () => {
 const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/user/all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-yellow-400">User Management</h1>

      <div className="bg-black/60 p-8 rounded-2xl border border-yellow-600/20">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-yellow-600/30">
              <th className="py-3">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-yellow-600/10 hover:bg-yellow-600/10">
                <td className="py-4">{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-sm">
                    {user.role}
                  </span>
                </td>

                <td>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.status === "ACTIVE"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}>
                    {user.status}
                  </span>
                </td>

                <td className="space-x-3">
                  <button className="px-4 py-1 bg-blue-600 rounded-lg hover:bg-blue-500 transition">
                    View
                  </button>
                  <button className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
