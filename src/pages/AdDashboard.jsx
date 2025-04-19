import React, { useState } from "react";
import AdHistory from "../components/AdHistory";
import NewAdForm from "../components/NewAdForm";
import AccountDetails from "../components/AccountDetails";

export default function AdDashboard() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Advertiser Dashboard</h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-6 py-2 rounded-full ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`px-6 py-2 rounded-full ${activeTab === "new" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("new")}
          >
            New Ad
          </button>
          <button
            className={`px-6 py-2 rounded-full ${activeTab === "account" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </div>

        <div>
          {activeTab === "history" && <AdHistory />}
          {activeTab === "new" && <NewAdForm />}
          {activeTab === "account" && <AccountDetails />}
        </div>
      </div>
    </div>
  );
}
