import React from "react";

const mockAds = [
  {
    id: 1,
    type: "Video",
    status: "Published",
    date: "2025-04-01",
    cost: "$120",
  },
  {
    id: 2,
    type: "Image",
    status: "Pending",
    date: "2025-04-05",
    cost: "$60",
  },
];

export default function AdHistory() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Published Ad History</h2>
      <div className="grid gap-4">
        {mockAds.map((ad) => (
          <div key={ad.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
            <p><strong>Type:</strong> {ad.type}</p>
            <p><strong>Status:</strong> {ad.status}</p>
            <p><strong>Date:</strong> {ad.date}</p>
            <p><strong>Cost:</strong> {ad.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
