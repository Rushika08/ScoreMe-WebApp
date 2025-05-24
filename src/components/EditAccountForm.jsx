// src/components/EditAccountForm.jsx
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function EditAccountForm({ userData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: userData.username || "",
    mobile: userData.mobile || "",
    accountType: userData.accountType || "",
    paymentMethod: userData.paymentMethod || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, formData);
        alert("Details updated successfully!");
        onUpdate(); // Refresh AccountDetails
        onClose();  // Close the form/modal
      } catch (error) {
        console.error("Error updating user data:", error);
        alert("Failed to update. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">Edit Account Details</h3>

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Account Type:</label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
        </select>
      </div>

      <div>
        <label>Payment Method:</label>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
