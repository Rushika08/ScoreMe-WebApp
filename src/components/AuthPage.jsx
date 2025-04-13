import { useState } from "react";
import adAgencyImage from "../assets/ad_agency_scene_2.jpg"; // Path to your background image

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState("individual"); // State for the radio buttons
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleForm = () => setIsRegister(!isRegister);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (isRegister) {
      if (
        !formData.username ||
        !formData.email ||
        !formData.mobile ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setErrorMessage("All fields are required.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
    } else {
      // Validate for login (Username and Password)
      if (!formData.username || !formData.password) {
        setErrorMessage("Username and Password are required.");
        return;
      }
    }

    // Clear error message if validation passes
    setErrorMessage("");
    // Handle form submission (e.g., make API call)
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${adAgencyImage})` }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Display error message */}
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* For Registration */}
          {isRegister && (
            <>
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              {/* User Type - Company or Individual */}
              <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium">Account Type</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="individual"
                      name="userType"
                      value="individual"
                      checked={userType === "individual"}
                      onChange={() => setUserType("individual")}
                      className="mr-2"
                    />
                    <label htmlFor="individual" className="text-gray-700">Individual</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="company"
                      name="userType"
                      value="company"
                      checked={userType === "company"}
                      onChange={() => setUserType("company")}
                      className="mr-2"
                    />
                    <label htmlFor="company" className="text-gray-700">Company</label>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-700 font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </>
          )}

          {/* For Login */}
          {!isRegister && (
            <>
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>

        <div className="text-center mt-4">
          <button
            className="text-gray-800 font-medium hover:text-blue-700 hover:underline"
            onClick={() => alert("Continuing without login...")}
          >
            Continue without login
          </button>
        </div>
      </div>
    </div>
  );
}
