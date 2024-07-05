import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createEvento } from "../../../service/EventService";
import Swal from "sweetalert2";
import MenuEvent from "./MenuEvent";
import * as XLSX from "xlsx";

const MolFormEventCreate = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
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

      rowsData.forEach(async (rowData) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("date", date);
        formData.append("url", url);
        formData.append("max", max);
        formData.append("min", min);
        try {
          const { data } = await createEvento(formData);
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
        navigate("/");
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
      formData.append("date", date);
      formData.append("url", url);
      formData.append("max", max);
      formData.append("min", min);

      const { data } = await createEvento(formData);
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu evento se ha creado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/");
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
      <MenuEvent />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Crear Evento
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Nombre del Evento <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Fecha y Hora <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  placeholder="Fecha"
                  autoComplete="date"
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Enlace de la reunión <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="url"
                  name="url"
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  autoComplete="url"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Número de entrevistas <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="max"
                  id="max"
                  value={max}
                  onChange={(event) => setMax(event.target.value)}
                  placeholder="Maximas"
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
                <input
                  type="number"
                  name="min"
                  id="min"
                  value={min}
                  onChange={(event) => setMin(event.target.value)}
                  placeholder="Mínimas"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-stone3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
          >
            Crear evento
          </button>
          <button
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/eventtable">Ver Evento</a>
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
};

export default MolFormEventCreate;
