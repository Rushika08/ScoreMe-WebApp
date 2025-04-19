import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

import AdHistory from "../components/AdHistory";
import NewAdForm from "../components/NewAdForm";
import AccountDetails from "../components/AccountDetails";

export default function AdDashboard() {
  const [activeTab, setActiveTab] = useState("history");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/auth"); // Redirect to login page
      } else {
        setLoading(false); // User is authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-4 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Advertiser Dashboard
        </h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === "new" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New Ad
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === "account" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
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
