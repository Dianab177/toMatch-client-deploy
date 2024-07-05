import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRegions } from "../../../service/RegionsService";
import { getProvincesById, updateProvinces } from "../../../service/ProvincesService";
import Swal from "sweetalert2";
import MolMenuAdmin from '../mol-regions/MolMenuAdmin';


const MolFormEdit = ({ event }) => {
  
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [region_id, setRegion_id] = useState("");
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [iso, setIso] = useState("");
  

 
  useEffect(() => {
    const fetchProvincia = async () => {
      try {
        const { data } = await getProvincesById(id);
        setRegion_id(data.province.region_id);
        setName(data.province.name);
        setLat(data.province.lat);
        setLong(data.province.long);
        setIso(data.province.iso);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    
    };
    fetchProvincia();
  }, [id]);

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ([region_id, name, lat, long, iso].some((value) => value === "")) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe completar todos los campos",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    try {
      const eventData = {
        region_id,
        name,
        lat,
        long,
        iso,
      };

      await updateProvinces(id, eventData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu provincia se ha actualizado con éxito!",
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
        <h2 className="text-2xl font-semibold leading-7 text-orange">Editar provincia</h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
          
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Región
              </label>
              <select
                  name="region_id"
                  id="region_id"
                  value={region_id} // Cambiar 'regions' por el estado que representa la opción seleccionada
                  onChange={(event) => setRegion_id(event.target.value)} // Cambiar 'setRegions' por el método que actualiza el estado de la opción seleccionada
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {regions.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Provincia
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
                htmlFor="lat"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Latitud
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="numbre"
                  name="lat"
                  id="lat"
                  value={lat}
                  onChange={(event) => setLat(event.target.value)}
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="long"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Longitud
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="long"
                  name="long"
                  type="numbre"
                  value={long}
                  onChange={(event) => setLong(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="iso"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                ISO
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="iso"
                  id="iso"
                  value={iso}
                  onChange={(event) => setIso(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="text-sm my-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orangel hover:from-verde hover:to-verdel ..."
          >
          Editar región
          </button>
          <button
            className="text-sm my-10 mx-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/provincetable">Ver Región</a>
          </button>
        </form>
        
      </div>
    </>
  );
}

export default MolFormEdit;
