import React from "react";

const mockAccount = {
  username: "rushika_advertiser",
  email: "rushika@example.com",
  paymentMethod: "**** **** **** 1234",
};

export default function AccountDetails() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Information</h2>
      <div className="bg-gray-100 p-4 rounded shadow">
        <p><strong>Username:</strong> {mockAccount.username}</p>
        <p><strong>Email:</strong> {mockAccount.email}</p>
        <p><strong>Payment:</strong> {mockAccount.paymentMethod}</p>
      </div>
    </div>
  );
}
