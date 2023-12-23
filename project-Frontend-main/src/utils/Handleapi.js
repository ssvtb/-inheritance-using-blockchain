import axios from "axios";

const baseUrl = "http://localhost:5001";

const gethomeurl = (setMessage) => {
  axios
    .get(`${baseUrl}/`)
    .then(({ data }) => {
      console.log(`data--->`, data.Message);
      setMessage(data.Message);
    })
    .catch((err) => {
      console.log(err);
      setMessage(err);
    });
};

const createWill = async (
  formData,
  file,
  setEncid,
  setUID,
  setFormData,
  setFile
) => {
  let fillForm = new FormData();
  fillForm.append("file", file);
  fillForm.append("Name", formData.Name);
  fillForm.append("UIDc", formData.UIDc);
  fillForm.append("UIDn", formData.UIDn);
  fillForm.append("passwordc", formData.passwordc);
  fillForm.append("passwordn", formData.passwordn);
  let response;
  await axios
    .post(`${baseUrl}/createWill`, fillForm)
    .then((data) => {
      // console.log(`data-->`, data.data.encid);
      const i = data.data.encid;
      if (data.data.Message === "UIDc already present") {
        response = "UIDc present";
      } else if (
        data.data.Message === `Data added to Database Successfully....`
      ) {
        response = data.data.encid;
        setUID(formData.UIDc);
        setFormData({
          Name: "",
          UIDc: "",
          nomanieeName: "",
          UIDn: "",
          passwordc: "",
          passwordn: "",
          CreconfirmPassword: "",
          NomconfirmPassword: "",
        });
        setFile(null);
      } else {
        response = "reload";
      }
      // setEncid(i);
    })
    .catch((err) => console.log(err));

  // console.log(response);
  return response;
};

const downloadCreatorKey = async (UIDc) => {
  // console.log(UIDc);
  // await axios
  // .get(`${baseUrl}/download/creator-key?UIDc=${UIDc}`)
  // .catch((err)=>console.log(err));
  try {
    // Make a request to the backend to get the file
    const response = await axios.get(
      `${baseUrl}/download/creator-key?UIDc=${UIDc}`,
      {
        responseType: "blob", // Specify the response type as 'blob' for binary data
      }
    );

    // Create a blob from the binary data received
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = UIDc + "CreatorKey.pdf"; // Set the desired filename
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const downloadNomineeKey = async (UIDc) => {
  try {
    // Make a request to the backend to get the file
    const response = await axios.get(
      `${baseUrl}/download/nomini-key?UIDc=${UIDc}`,
      {
        responseType: "blob", // Specify the response type as 'blob' for binary data
      }
    );

    // Create a blob from the binary data received
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = UIDc + "NominieeKey.pdf"; // Set the desired filename
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const RetrieveWill = async (file, formData, setUID, setFormData, setFile) => {
  const fillForm = new FormData();
  fillForm.append("file", file);
  // fillForm.append('Name',formData.Name);
  fillForm.append("UIDc", formData.UIDc);
  fillForm.append("UIDn", formData.UIDn);
  fillForm.append("password", formData.password);
  let response;
  await axios
    .post(`${baseUrl}/retriveWill`, fillForm)
    .then((data) => {
      // console.log(`data-->`, data.data);
      if (data.data.Message === "No Data Present") {
        response = "No Data";
      } else if (data.data.Message === "UIDn not matching") {
        response = "Wrong UIDn";
      } else if (data.data.Message === "Wrong Password") {
        response = "Wrong Password";
      } else if (data.data.Message === "File retrived") {
        response = data.data.fileName;
        // setEncid(i);
        setUID(formData.UIDc);
        setFormData({
          UIDc: "",
          UIDn: "",
          password: "",
        });
        setFile(null);
      }
    })
    .catch((err) => console.log(err));
  return response;
};

const downloadWill = async (UIDc, filename) => {
  try {
    // Make a request to the backend to get the file
    const response = await axios.get(`${baseUrl}/download/Will?UIDc=${UIDc}`, {
      responseType: "blob", // Specify the response type as 'blob' for binary data
    });

    // Create a blob from the binary data received
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename; // Set the desired filename
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const UpdateWillPrivateKey = async (file, setFile1) => {
  const fillForm = new FormData();
  fillForm.append("file", file);
  axios.post(`${baseUrl}/Update-willprivateKey`, fillForm).then((data) => {
    // console.log(`data-->`, data);
    setFile1(null);
  });
};

const UpdateWill = async (file, setFile2, formData, setFormData) => {
  const fillForm = new FormData();
  fillForm.append("file", file);
  fillForm.append("Name", formData.Name);
  fillForm.append("UIDc", formData.UIDc);
  fillForm.append("password", formData.password);
  let reply;
  await axios.post(`${baseUrl}/Update-will`, fillForm).then((data) => {
    // setFormData({});
    // console.log(`data-->`, data);
    if (data.data.Message === "ha ha ha first create to update") {
      reply = "No Data";
    } else if (data.data.Message === "Incorrect Password, Please try again") {
      reply = "Wrong Password";
    } else if (
      data.data.Message === "Deleted old file successfully and uploded new..."
    ) {
      reply = data.data.Enccid;
      setFormData({
        Name: "",
        UIDc: "",
        password: "",
      });
      setFile2(null);
    }
  });
  // console.log(`check reply`, reply);
  return reply;
};

const UpdateIndex = async (UIDc, Index) => {
  await axios
    .get(`${baseUrl}/Update/Thash?UIDc=${UIDc}&Thash=${Index}`)
    .then((data) => {
      console.log(data.data);
    });
};

export {
  gethomeurl,
  createWill,
  downloadCreatorKey,
  downloadNomineeKey,
  RetrieveWill,
  downloadWill,
  UpdateWillPrivateKey,
  UpdateWill,
  UpdateIndex,
};
