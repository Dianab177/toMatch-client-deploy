import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createStacks } from "../../../service/StacksService";
import Swal from "sweetalert2";
import MolMenuAdmin from "../mol-regions/MolMenuAdmin";
import * as XLSX from "xlsx";

export default function MolFormStacksCreate() {
  const [name, setName] = useState("");
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // assuming first row is header
      const header = rows[0];
      const rowsData = rows.slice(1).map((row) => {
        return header.reduce((acc, curr, index) => {
          acc[curr] = row[index];
          return acc;
        }, {});
      });
      // Assuming column names in excel are: name, lat, long, iso
      rowsData.forEach(async (rowData) => {
        const formData = new FormData();
        formData.append("name", rowData.name);
        try {
          const { data } = await createStacks(formData);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tus datos se han añadido con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/stackstable");
      }, 2000); // Delay the navigation for 2 seconds (2000 milliseconds)
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);

      const { data } = await createStacks(formData);
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu stack se ha creado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/stackstable");
      }, 2000); // Delay the navigation for 2 seconds (2000 milliseconds)
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha habido un problema, ¡prueba de nuevo!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <MolMenuAdmin />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Añadir Stack
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Nombre del Stack <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Inserte nombre del stack."
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
          >
            Añadir Stack
          </button>
          <button
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/stackstable">Ver Stacks</a>
          </button>
          <button
            htmlFor="excel"
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
            onClick={handleClick}
          >
            Seleccionar excel
            <input
              type="file"
              id="excel"
              name="excel"
              onChange={handleExcelUpload}
              accept=".xlsx"
              ref={fileInput}
              style={{ display: "none" }}
            />
          </button>
        </form>
      </div>
    </>
  );
}
