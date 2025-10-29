import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Please login to view profile.</p>;

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor:"#556b2f", color:"#fff", border:"none", borderRadius:"5px" }}>Logout</button>
    </div>
  );
};

export default Profile;
