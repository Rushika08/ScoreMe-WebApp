import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import EditAccountForm from "./EditAccountForm"; // Import the edit form

export default function AccountDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  if (loading) return <p>Loading account details...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Information</h2>

      {isEditing ? (
        <EditAccountForm
          userData={userData}
          onClose={handleCloseEdit}
          onUpdate={fetchUserData}
        />
      ) : (
        <div className="bg-gray-100 p-4 rounded shadow space-y-2">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username || "Not set"}</p>
          <p><strong>Mobile:</strong> {userData.mobile || "Not set"}</p>
          <p><strong>Account Type:</strong> {userData.accountType || "Not set"}</p>
          <p><strong>Payment:</strong> {userData.paymentMethod || "Not set"}</p>

          <button
            onClick={handleEdit}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Details
          </button>
        </div>
      )}
    </div>
  );
}
