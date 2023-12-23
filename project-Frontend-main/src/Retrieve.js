import React, { useState } from "react";
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import { RetrieveWill } from "./utils/Handleapi";

function Retrieve() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [UID, setUID] = useState("");
  const Navigate = useNavigate();

  const contractAddress = "0x65ef37C94424847113500D5bC6E4821699bE9a07"; // Replace with your actual contract address
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "cid",
          type: "string",
        },
      ],
      name: "storePerson",
      outputs: [
        {
          internalType: "uint256",
          name: "ind",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "i",
          type: "uint256",
        },
      ],
      name: "getPerson",
      outputs: [
        {
          internalType: "string",
          name: "cid",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate id field
    // if ((name === 'UIDC' || name==='UIDn') && !isIdValid(value)) {
    //   // Handle invalid id
    //   return;
    // }
    if (name === "UIDc") {
      setUID(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async (e) => {
    // Check if the entered ID or Nominee ID match the stored data
    // if (formData) {
    //   const matchingNominee = formData.nominees.find(
    //     (nominee) => nominee.nomineeId === searchNomineeId
    //   );

    //   if (
    //     (formData.id === searchId && formData.pdfFile) ||
    //     (matchingNominee && matchingNominee.pdfFile)
    //   ) {
    //     setFoundPdf(formData.pdfFile || (matchingNominee && matchingNominee.pdfFile) || null);
    //   } else {
    //     setFoundPdf(null);
    //   }
    // } else {
    //   setFoundPdf(null);
    // }
    e.preventDefault();
    if (formData.UIDc === formData.UIDn) {
      alert("Name and Nominee Name should be different");
      return; // Stop the submission if names are the same
    } else if (formData.UIDc.length != 12 || formData.UIDn.length != 12) {
      alert("Creator and Nominee ID should be exactly 12 Integers long");
      return;
    } else if (formData.password.length < 8) {
      alert("Password should be atleast 8 characters");
      return;
    } else {
      let reply = await RetrieveWill(
        file,
        formData,
        setUID,
        setFormData,
        setFile
      );
      // have to try this one let ecidstr=await contract.getPerson(UID)
      if (reply === "No Data") {
        alert("There is no will present, Upload a Will");
        Navigate("/add-user");
      } else if (reply === "Wrong UIDn") {
        alert("UIDn is invalid, check your UIDn");
        return;
      } else if (reply === "Wrong Password") {
        alert("Incorrect Password, Retry again");
        Navigate("/retrieve");
      } else {
        // console.log(formData);
        // console.log(UID);
        // console.log(file);
        Navigate("/download-will", { state: { UIDc: UID, filename: reply } });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <h2>Retrieve Page</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>UIDc:</label>
          <input
            type="number"
            name="UIDc"
            value={formData.UIDc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nominee UIDn:</label>
          <input
            type="number"
            name="UIDn"
            value={formData.UIDn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password for the Document:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Nominee PrivateKey:</label>
          <input
            type="file"
            accept=".pdf"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Retrieve Will</button>
      </form>
    </div>
  );
}

export default Retrieve;
