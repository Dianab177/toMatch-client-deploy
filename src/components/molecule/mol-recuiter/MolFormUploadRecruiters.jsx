import React, { useState } from "react";
import { createExcelRecruiters } from "../../../service/RecruitersService";



function MolFormUploadRecruiters() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Debe seleccionar un archivo");
      return;
    }

    setErrorMessage("");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    createExcelRecruiters(formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="file"
        className="text-sm text-white my-10 mx-10 px-8 py-2.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
      >
        Seleccionar excel
      </label>
      <input
        type="file"
        id="file"
        accept=".xlsx, .xls"
        required={true}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MolFormUploadRecruiters;
