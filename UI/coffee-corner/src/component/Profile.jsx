import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("User in Profile:", user);
  }, [user]);

  if (!user) return <p className="text-center text-red-600 mt-10">Not logged in.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">User Profile</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>First Name:</strong> {user.fname}</p>
        <p><strong>Last Name:</strong> {user.lname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Roles:</strong> {user.roles.map(role => role.name).join(", ")}</p>
      </div>
    </div>
  );
}
