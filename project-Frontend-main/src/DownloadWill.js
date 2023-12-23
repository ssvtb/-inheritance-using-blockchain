import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { downloadWill } from "./utils/Handleapi";

function DownloadWill() {
  const Navigate = useNavigate();
  const location = useLocation();
  const UIDc = location.state.UIDc || "342823";
  const fileName = location.state.filename;

  const handleDownload = async () => {
    // Logic to download the will (PDF format)
    console.log("Downloading the will (PDF)");

    await downloadWill(UIDc, fileName);
    // Redirect to the home page after downloading the will
    Navigate("/app");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Download Will</h2>
      <p>Downloadable format of the will:</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default DownloadWill;
