import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCompaniesById,
  updateCompanies,
} from "../../../service/CompaniesService";
import Swal from "sweetalert2";
import { getProvinces } from "../../../service/ProvincesService";
import MenuCompanies from "./MenuCompanies";

const MolFormCompaniesEdit = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ubication, setUbication] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState("");
  const [province_id, setProvince_id] = useState("");
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await getCompaniesById(id);
        setName(data.company.name);
        setUbication(data.company.ubication);
        setEmail(data.company.email);
        setPhone(data.company.phone);
        setPriority(data.company.priority);
        setProvince_id(data.company.province_id);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      [
        name, 
        ubication, 
        email, 
        phone, 
        priority, 
        province_id
      ].some((value) => value === "")
    ) {
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
        name,
        ubication,
        email,
        phone,
        priority,
        province_id,
      };

      await updateCompanies(id, eventData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡La empresa se ha actualizado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/companiestable");
      }, 2000); // Delay the navigation for 2 seconds (2000 milliseconds)
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha habido un problema ¡prueba de nuevo!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    getProvinces()
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <MenuCompanies />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Editar empresas
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Nombre de la empresa <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Inserte nombre de la empresa."
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-location"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Dirección de la empresa <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="ubication"
                  id="ubication"
                  value={ubication}
                  onChange={(event) => setUbication(event.target.value)}
                  placeholder="Inserte ubicación de la empresa."
                  autoComplete="ubication"
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="province_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Provincia <span className="text-orange">*</span>
              </label>
              <select
                type="text"
                name="province_id"
                id="province_id"
                value={province_id} // Cambiar 'regions' por el estado que representa la opción seleccionada
                onChange={(event) => setProvince_id(event.target.value)} // Cambiar 'setRegions' por el método que actualiza el estado de la opción seleccionada
                className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {provinces.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-email"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Email de la empresa <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Inserte email de la empresa."
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-phone"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Télefono de la empresa <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Inserte télefono de la empresa."
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-priority"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Prioridad de la empresa <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="priority"
                  name="priority"
                  type="number"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  placeholder="Inserte prioridad de la empresa."
                  autoComplete="priority"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-sm my-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orangel hover:from-verde hover:to-verdel ..."
          >
            Editar empresa
          </button>
          <button
            className="text-sm my-10 mx-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/companiestable">Ver empresas</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default MolFormCompaniesEdit;
