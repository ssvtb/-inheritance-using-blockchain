import React, { useState } from "react";
import "./App.css";
import {
  UpdateWill,
  UpdateWillPrivateKey,
  UpdateIndex,
} from "./utils/Handleapi";
import { useNavigate } from "react-router-dom";
import { ethers, providers } from "ethers";
//import './AddUser.css';

function UpdateUser() {
  const [formData, setFormData] = useState({
    // name: '',
    // id: '',
  });

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFile1Change = (e) => {
    const file = e.target.files[0];
    setFile1(file);
  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    setFile2(file);
  };

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
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  let contract;
  let signer;
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then(function (accounts) {
      signer = provider.getSigner(accounts[0]);
      contract = new ethers.Contract(contractAddress, abi, signer);
    });
  });

  // const [index,setIndex]=useState("");

  const handleStorePerson = async (EncCid) => {
    // console.log(EncCid);
    //backend func
    //setCid(ecid);
    const createPerson = await contract.storePerson(EncCid);
    const i = await contract.getIndex();
    // setIndex(parseInt(i._hex,16));
    //func to send index to the backend;
    // console.log(createPerson);
    return i;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send the data to your server or perform any other action.
    // console.log(formData);
    let UID = formData.UIDc;
    if (formData.UIDc.length != 12) {
      alert("Creator UIDc should be exactly 12 Integers long");
      return;
    } else if (formData.password.length < 8) {
      alert("Password should be atleast 8 characters");
      return;
    } else {
      await UpdateWillPrivateKey(file1, setFile1);
      const reply = await UpdateWill(file2, setFile2, formData, setFormData);
      // console.log(`reply->`, reply);
      if (reply === "No Data") {
        alert(
          "You have no data to update the Will, Upload your will as a new User"
        );
        Navigate("/add-user");
      } else if (reply === "Wrong Password") {
        alert("Incorrect Password, Retry again");
        Navigate("/update-user");
      } else {
        const Index = await handleStorePerson(reply);
        alert("File added successfully");
        const newIndex = parseInt(Index._hex, 16);
        await UpdateIndex(UID, newIndex);
        Navigate("/app");
      }
    }
  };

  return (
    <div>
      <h2>Update User Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>UIDc:</label>
          <input
            type="number"
            name="UIDc"
            value={formData.UIDc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload CreatorKey File:</label>
          <input
            type="file"
            accept=".pdf"
            name="createfile"
            onChange={handleFile1Change}
          />
        </div>
        <div>
          <label>Password of the Document:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload New Will File:</label>
          <input
            type="file"
            accept=".pdf"
            name="willfile"
            onChange={handleFile2Change}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
