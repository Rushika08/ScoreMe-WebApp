import React, { useState } from "react";

export default function NewAdForm() {
  const [form, setForm] = useState({
    title: "",
    type: "Image",
    duration: "",
    size: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ad submitted successfully!");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Submit New Advertisement</h2>

      <input
        type="text"
        name="title"
        placeholder="Ad Title"
        className="w-full p-2 border border-gray-300 rounded"
        value={form.title}
        onChange={handleChange}
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="Image">Image</option>
        <option value="Video">Video</option>
      </select>

      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g. 30 days)"
        className="w-full p-2 border border-gray-300 rounded"
        value={form.duration}
        onChange={handleChange}
      />

      <input
        type="text"
        name="size"
        placeholder="Display Size (e.g. 300x250)"
        className="w-full p-2 border border-gray-300 rounded"
        value={form.size}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Ad
      </button>
    </form>
  );
}
