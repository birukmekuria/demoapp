import React, { useState } from "react";

const Login = () => {
  // Declare the state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Declare a state variable to store the response from the server
  const [response, setResponse] = useState("");

  // Write a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const data = {
      email: email,
      password: password,
    };

    // Send the data to the server
    const apiUrl = "http://51.20.250.139:4000/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = fetch(apiUrl, requestOptions);
    // Save the response from the server in the state variable
    response
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);

        // Check the response from the server
        if (data.status === "success") {
          console.log("Login Successful");

          // Redirect the user to home page after 5 seconds
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      })
      .catch((err) => console.log(err));

    // Reset the form
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1>Login </h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="Submit" className="submit" />
      </form>
    </>
  );
};

export default Login;
