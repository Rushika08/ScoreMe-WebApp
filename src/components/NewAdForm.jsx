import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewAdForm() {
  const [form, setForm] = useState({
    title: "",
    type: "Image",
    duration: "",
    size: "300x250",
    media: null,
  });

  const [error, setError] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [price, setPrice] = useState(0);

  const displaySizes = ["300x250", "728x90", "160x600", "970x250"];

  useEffect(() => {
    const calculatedPrice = calculatePrice(form.duration, form.size, form.type);
    setPrice(calculatedPrice);
  }, [form.duration, form.size, form.type]);

  const calculatePrice = (duration, size, type) => {
    const basePricePerDay = 10;
    const sizeMultipliers = {
      "300x250": 1,
      "728x90": 1.5,
      "160x600": 1.8,
      "970x250": 2,
    };
    const typeMultiplier = {
      Image: 1,
      Video: 1.5,
    };
    const days = parseInt(duration) || 0;
    return Math.round(days * basePricePerDay * sizeMultipliers[size] * typeMultiplier[type]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "type") {
      setForm((prev) => ({ ...prev, media: null }));
      setPreviewURL("");
      setShowPreview(false);
    }
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (form.type === "Image" && !isImage) {
      setError("Please upload a valid image.");
      setForm((prev) => ({ ...prev, media: null }));
      return;
    }

    if (form.type === "Video" && !isVideo) {
      setError("Please upload a valid video.");
      setForm((prev) => ({ ...prev, media: null }));
      return;
    }

    setForm((prev) => ({ ...prev, media: file }));
    setPreviewURL(URL.createObjectURL(file));
    setShowPreview(false);
    setError("");
  };

  const handlePreview = () => {
    if (!form.media) {
      setError("Please upload a file to preview the ad.");
      return;
    }
    setError("");
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.duration || !form.size || !form.media) {
      setError("Please fill all fields and upload a valid file.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to submit an ad.");
        return;
      }

      const fileRef = ref(storage, `ads/${user.uid}/${Date.now()}_${form.media.name}`);
      await uploadBytes(fileRef, form.media);
      const downloadURL = await getDownloadURL(fileRef);

      const adData = {
        userId: user.uid,
        title: form.title,
        type: form.type,
        duration: form.duration,
        size: form.size,
        mediaURL: downloadURL,
        price,
        visibility: true, // ✅ NEW: add visibility
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "ads"), adData);

      alert("Ad submitted successfully!");
      setForm({
        title: "",
        type: "Image",
        duration: "",
        size: "300x250",
        media: null,
      });
      setPreviewURL("");
      setShowPreview(false);
    } catch (err) {
      console.error("Error submitting ad:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const getSizeStyle = () => {
    const [width, height] = form.size.split("x").map(Number);
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Submit New Advertisement</h2>

      {error && (
        <div className="bg-red-200 text-red-700 p-2 rounded">{error}</div>
      )}

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
        placeholder="Duration (in days)"
        className="w-full p-2 border border-gray-300 rounded"
        value={form.duration}
        onChange={handleChange}
      />

      <select
        name="size"
        value={form.size}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        {displaySizes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept={form.type === "Image" ? "image/*" : "video/*"}
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div className="text-right font-semibold text-blue-700">
        Estimated Price: LKR {price}
      </div>

      {showPreview && previewURL && (
        <div className="border p-3 rounded bg-gray-50">
          <p className="text-sm font-medium mb-2">Ad Preview ({form.size}):</p>
          <div
            className="border border-gray-300 mx-auto flex items-center justify-center overflow-hidden bg-white"
            style={getSizeStyle()}
          >
            {form.type === "Image" ? (
              <img
                src={previewURL}
                alt="Ad Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video controls className="w-full h-full object-cover">
                <source src={previewURL} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePreview}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Preview Ad
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Ad
        </button>
      </div>
    </form>
  );
}
