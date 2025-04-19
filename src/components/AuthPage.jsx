import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adAgencyImage from "../assets/ad_agency_scene_2.jpg";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState("individual");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleForm = () => setIsRegister(!isRegister);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!formData.username || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
        setErrorMessage("All fields are required.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      setErrorMessage("");
      alert("Registration successful!");
      navigate("/dashboard");

    } else {
      if (!formData.username || !formData.password) {
        setErrorMessage("Username and Password are required.");
        return;
      }
    }
    // 👉 This is where you can validate login here or hit an API
    // For now, we assume login is successful
    setErrorMessage("");
    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${adAgencyImage})` }}>
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
          {isRegister && (
            <>
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your username" />
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium">Account Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" value="individual" checked={userType === "individual"} onChange={() => setUserType("individual")} className="mr-2" />
                    Individual
                  </label>
                  <label className="flex items-center">
                    <input type="radio" value="company" checked={userType === "company"} onChange={() => setUserType("company")} className="mr-2" />
                    Company
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your email" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Mobile Number</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your mobile number" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your password" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Confirm your password" />
              </div>
            </>
          )}

          {!isRegister && (
            <>
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your username" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your password" />
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={toggleForm} className="text-blue-600 font-semibold hover:underline">
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>

        <div className="text-center mt-4">
          <button onClick={() => navigate("/ad-prices")}
            className="text-gray-800 font-medium hover:text-blue-700 hover:underline">
            View Ad Prices
          </button>
        </div>
      </div>
    </div>
  );
}

