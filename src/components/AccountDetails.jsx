import React from "react";

const mockAccount = {
  username: "rushika_advertiser",
  email: "rushika@example.com",
  mobile: "+91-9876543210",
  accountType: "Individual", // or "Company"
  paymentMethod: "**** **** **** 1234",
};

export default function AccountDetails() {
  const handleEdit = () => {
    alert("Edit feature coming soon!"); // Replace with navigation/modal logic
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Information</h2>
      <div className="bg-gray-100 p-4 rounded shadow space-y-2">
        <p><strong>Username:</strong> {mockAccount.username}</p>
        <p><strong>Email:</strong> {mockAccount.email}</p>
        <p><strong>Mobile:</strong> {mockAccount.mobile}</p>
        <p><strong>Account Type:</strong> {mockAccount.accountType}</p>
        <p><strong>Payment:</strong> {mockAccount.paymentMethod}</p>

        <button
          onClick={handleEdit}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
