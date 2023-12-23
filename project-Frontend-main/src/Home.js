// Home.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import './Home.css';
//import './AddUser.css';
import { gethomeurl } from "./utils/Handleapi";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the AddUser page
    navigate("/add-user");
  };

  const [message, setMessage] = useState("");

  const handleInput = () => {
    gethomeurl(setMessage);
  };
  return (
    // <div className="container">
    //   <h2>Welcome to Will Authentication System using Blockchain</h2>
    //   <p>
    //   Empower your legacy with our Blockchain Will Authentication System!
    //   Welcome to LegacyBlock!
    //   The future of will authentication is here, and we're excited to be at the forefront of this technological advancement. 
    //   Our platform offers a simple and secure solution for authenticating your will using blockchain technology.
    //   Ensuring security and transparency, we redefine the future of will Authenticity. 
    //   Join us for a seamless, tamper-proof experience—your key to safeguarding what matters most.
    //   </p>
    //   <h2>{message}</h2>
    //   {/* <button onClick = {handleInput}>value</button> */}
    //   <button onClick={handleGetStarted}>Get Started</button>
    // </div>
    <div style={{ width: '50%', margin: 20, textAlign: 'left' }}>
      <h2 style={{ whiteSpace: 'nowrap' }}>Welcome to Will Authentication System using Blockchain</h2>
      <p style={{ width: '100%', display: 'inline-block', textAlign: 'left' }}>
        Empower your legacy with our Blockchain Will Authentication System!
        Welcome to LegacyBlock!
        The future of will authentication is here, and we're excited to be at the forefront of this technological advancement. 
        Our platform offers a simple and secure solution for authenticating your will using blockchain technology.
        Ensuring security and transparency, we redefine the future of will Authenticity. 
        Join us for a seamless, tamper-proof experience—your key to safeguarding what matters most.
      </p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
