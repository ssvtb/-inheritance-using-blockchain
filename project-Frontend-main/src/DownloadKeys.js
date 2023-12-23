import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { downloadCreatorKey, downloadNomineeKey } from "./utils/Handleapi";
//import './DownloadKeys.css';

function DownloadKeys() {
  const Navigate = useNavigate();
  const location = useLocation();
  const UIDc = location.state.UIDc || "";
  const handleDownloadCreatorKey = async () => {
    // Logic to download the creator's private key
    console.log("Downloading creator's private key");
    await downloadCreatorKey(UIDc);
    await downloadNomineeKey(UIDc);
    // Navigate('/retrieve');
    Navigate("/app");
    // console.log(UIDc);
  };

  const handleDownloadNomineeKey = () => {
    // Logic to download the nominee's private key
    console.log("Downloading nominee's private key");

    // Redirect to the AddUser page after both keys are downloaded
    Navigate("/retrieve");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Download Keys</h2>
      <div style={{ textAlign: 'left' }}>
        <h3>Private Keys</h3>
        <button onClick={handleDownloadCreatorKey}>Download</button>
      </div>
    </div>
  );
}

export default DownloadKeys;
