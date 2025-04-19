import React from "react";

export default function AdPrices() {
  const pricingOptions = [
    {
      title: "📹 Video Ads",
      price: "₹2000 / 30 seconds",
      description: "Engage your audience with rich media content. Discounts for longer durations.",
      bgColor: "bg-blue-50",
    },
    {
      title: "📸 Photo Ads",
      price: "₹500 / photo",
      description: "Get noticed with eye-catching visuals. Displayed every 2 minutes.",
      bgColor: "bg-green-50",
    },
    {
      title: "🔁 Frequency",
      price: "₹300 / extra daily display",
      description: "Maximize impressions by increasing daily display frequency.",
      bgColor: "bg-yellow-50",
    },
    {
      title: "🖥️ Display Size",
      price: "Full-screen: ₹1000/day, Banner: ₹600/day, Sidebar: ₹400/day",
      description: "Choose how prominently your ad appears on screen.",
      bgColor: "bg-purple-50",
    },
  ];

  const whatsappNumber = "0094711201116"; // Replace with your actual number (in international format, no + sign)
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in a custom ad package. Can you help me?");
  const emailAddress = "ads@scoreme.com";
  const emailSubject = encodeURIComponent("Custom Advertisement Request");
  const emailBody = encodeURIComponent("Hello,\n\nI would like to inquire about custom advertisement options.\n\nThanks!");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Advertisement Pricing Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 ${option.bgColor}`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{option.title}</h3>
              <p className="text-lg font-bold text-blue-700 mb-2">{option.price}</p>
              <p className="text-gray-700">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-600 text-lg font-medium">
            Need a custom ad package? Contact us directly:
          </p>
          <div className="flex justify-center gap-6 mt-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
            >
              📲 WhatsApp Us
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
            >
              📧 Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
