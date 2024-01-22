import React, { useState, useEffect } from "react";
import { FaAllergies } from "react-icons/fa";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables for form fields and errors
//   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (!name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    // If there are no errors, you can proceed with form submission
    // if (!emailError && !passwordError && !nameError) {
    //   try {
    //     // Send POST request using Axios
    //     const response = await axios.post(
    //       "http://localhost:8000/auth/signup/",
    //       {
    //         name: name,
    //         username: email,
    //         password: password,
    //       }
    //     );

    //     // Handle response data as needed
    //     console.log("Server response:", response.data);
        

    //     // Display success message to the user (or redirect, etc.)
    //     alert("Signup successful!");
    //     navigate("/");
    //   } catch (error) {
    //     // Handle error (display error message, etc.)
    //     console.error(
    //       "Error during signup:",
    //       error.response ? error.response.data : error.message
    //     );
    //     alert("Signup failed. Please check your information.");
    //   }
    // }
  };

  // useEffect to clear errors when the user types in the input fields
  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [email, password]);

  return (
    <div className="main">
      <div className="main_div">
        <div className="flex_main">
          <div className="flex">
            <div className="flex_first">
              <div>
                <h1>
                  Signup <FaAllergies color="#5138ee" />
                </h1>

                <p>How do I get started from</p>

                <label>
                  Email
                  <br />
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <div className="error">{emailError}</div>

                <div className="mt-2">
                  <label>
                    Name
                    <br />
                    <input
                      type="password"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <div className="error">{nameError}</div>
                </div>

                <div className="mt-2">
                  <label>
                    Password
                    <br />
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <div className="error">{passwordError}</div>
                </div>

                <div>
                  <button className="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
              <div>
                <Link to="/login">
                  <h6>Login</h6>
                </Link>
              </div>
            </div>
            <div className="flex_second">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="signup-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
