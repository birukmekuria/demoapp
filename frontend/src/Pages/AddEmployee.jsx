import React, {useState} from "react";

const AddEmployee = () => {
// Declare the state variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// Write a function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to be sent to the server
        const data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
          };

          // Send the data to the server
          const apiUrl = "http://51.20.250.139:4000/add-employee";
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };
          const response = fetch(apiUrl, requestOptions)
          .then(res => console.log(res))
          .catch(err => console.log(err));

          // Reset the form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");


          
    }
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1>Add Employee</h1>
        <label htmlFor="fname">First Name</label>
        <input type="text" id="fname" name="fname" value={firstName} onChange={e=>setFirstName(e.target.value)} />
        <label htmlFor="lname">Last Name</label>
        <input type="text" id="lname" name="lname" value={lastName} onChange={e=>setLastName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input type="Submit"  className="submit"/>
      </form>
    </>
  );
};

export default AddEmployee;
