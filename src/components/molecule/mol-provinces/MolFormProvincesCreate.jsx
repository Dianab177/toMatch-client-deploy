import React, { useState, useEffect, useRef } from "react";
import { createProvinces } from "../../../service/ProvincesService";
import { getRegions } from "../../../service/RegionsService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import MolMenuAdmin from "../mol-regions/MolMenuAdmin";
import * as XLSX from "xlsx";

const MolFormProvincesCreate = () => {
  const [regions, setRegions] = useState([]);
  const [region_id, setRegion_id] = useState("");
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [iso, setIso] = useState("");
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
        formData.append("region_id", parseInt(region_id));
        formData.append("name", name);
        formData.append("lat", lat);
        formData.append("long", long);
        formData.append("iso", iso);
        try {
          const { data } = await createProvinces(formData);
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
        navigate("/provincecreate");
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
      formData.append("region_id", region_id);
      formData.append("name", name);
      formData.append("lat", lat);
      formData.append("long", long);
      formData.append("iso", iso);

      const { data } = await createProvinces(formData);
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu provincia se ha añadido con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/provincetable");
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

  useEffect(() => {
    getRegions()
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <MolMenuAdmin />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Añadir provincia
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="regions"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                CCAA <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  name="region_id"
                  id="region_id"
                  value={region_id} // Cambiar 'regions' por el estado que representa la opción seleccionada
                  onChange={(event) => setRegion_id(event.target.value)} // Cambiar 'setRegions' por el método que actualiza el estado de la opción seleccionada
                  placeholder="Inserte nombre de la CCAA."
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {regions.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Provincia/Ciudad <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Inserte nombre de la provincia/ciudad."
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="lat"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Latitud
              </label>

              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="lat"
                  id="lat"
                  value={lat}
                  onChange={(event) => setLat(event.target.value)}
                  placeholder="Inserte latitud."
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="long"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Longitud
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="long"
                  name="long"
                  type="text"
                  value={long}
                  onChange={(event) => setLong(event.target.value)}
                  placeholder="Inserte longitud."
                  className="block w-full rounded-md border-0 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="iso"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                ISO <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="iso"
                  name="iso"
                  type="text"
                  value={iso}
                  onChange={(event) => setIso(event.target.value)}
                  placeholder="Inserte ISO."
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
          >
            Añadir provincia
          </button>
          <button
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/provincetable">Ver provincia</a>
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

export default MolFormProvincesCreate;
