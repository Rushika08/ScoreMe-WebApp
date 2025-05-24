import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdHistory() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const adsRef = collection(db, "ads");
        const q = query(
          adsRef,
          where("userId", "==", user.uid),
          where("visibility", "==", true),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const adList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAds(adList);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await updateDoc(doc(db, "ads", selectedAd.id), {
        visibility: false,
      });
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== selectedAd.id));
      setShowConfirm(false);
      setShowModal(false);
      setSelectedAd(null);
    } catch (error) {
      console.error("Error hiding ad:", error);
    }
  };

  const handleExtend = () => {
    alert("Extend feature coming soon!");
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Published Ad History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : ads.length === 0 ? (
        <p>No ads submitted yet.</p>
      ) : (
        <div className="grid gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                setSelectedAd(ad);
                setShowModal(true);
              }}
            >
              <p><strong>Type:</strong> {ad.type}</p>
              <p><strong>Date:</strong> {ad.createdAt?.toDate().toLocaleDateString() || "N/A"}</p>
              <p><strong>Cost:</strong> LKR{ad.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showModal && selectedAd && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
            onClick={() => {
              setShowModal(false);
              setSelectedAd(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              {/* Close Button using your code */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAd(null);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold mb-4">Ad Details</h3>
              <p>
                <strong>Type:</strong> {selectedAd.type}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedAd.createdAt?.toDate().toLocaleDateString() || "N/A"}
              </p>
              <p>
                <strong>Cost:</strong> LKR{selectedAd.price}
              </p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleExtend}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Extend
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
            onClick={() => setShowConfirm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center z-50">
              <h4 className="text-lg font-semibold mb-4 text-red-600">Confirm Deletion</h4>
              <p className="mb-6">Are you sure you want to delete this ad?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
