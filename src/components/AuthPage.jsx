import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase"; // 🔥 include Firestore DB
import { doc, setDoc } from "firebase/firestore"; // 🔥 Firestore write
import adAgencyImage from "../assets/ad_agency_scene_2.jpg";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 Redirect to dashboard if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (isRegister) {
      if (!email || !password || !confirmPassword) {
        setErrorMessage("All fields are required.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      try {
        setIsLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔥 Store user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          role: "publisher" // or "admin", "viewer", etc.
        });

        navigate("/dashboard");
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!email || !password) {
        setErrorMessage("Email and password are required.");
        return;
      }

      try {
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } catch (err) {
        setErrorMessage("Invalid email or password.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${adAgencyImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 rounded-lg text-lg font-semibold transition duration-300`}
          >
            {isLoading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/ad-prices")}
            className="text-gray-800 font-medium hover:text-blue-700 hover:underline"
          >
            View Ad Prices
          </button>
        </div>
      </div>
    </div>
  );
}
