import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createRecruiters } from "../../../service/RecruitersService";
import { getCompanies } from "../../../service/CompaniesService";
import { getEvento } from "../../../service/EventService";
import MenuCompanies from "../mol-companies/MenuCompanies";
import MolFormUploadRecruiters from "./MolFormUploadRecruiters";

const MolFormRecruitersCreate = () => {
  const [event, setEvent] = useState([]);
  const [Companies, setCompanies] = useState([]);
  const [event_id, setEventId] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [charge, setCharge] = useState("");
  const [first_interview, setFirst_interview] = useState("");
  const [last_interview, setLast_interview] = useState("");
  const [remote, setRemote] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("event_id", event_id);
      formData.append("company_id", company_id);
      formData.append("name", name);
      formData.append("lastname", lastname);
      formData.append("charge", charge);
      formData.append("first_interview", first_interview);
      formData.append("last_interview", last_interview);
      formData.append("remote", remote);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("linkedin", linkedin);
      formData.append("gender", gender);

      const { data } = await createRecruiters(formData);
      console.log(data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu recruiter se ha creado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/recruiterstable");
      }, 2000); 
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
    getEvento()
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <MenuCompanies />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <div className="flex justify-between">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Añadir recruiter
        </h2>
        <MolFormUploadRecruiters/>
        </div>
        

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="event"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Evento <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  name="event_id"
                  id="event_id"
                  value={event_id} 
                  onChange={(event) => setEventId(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona un evento</option>
                  {event.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="regions"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Empresa <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  name="company_id"
                  id="company_id"
                  value={company_id} 
                  onChange={(event) => setCompanyId(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona una empresa</option>
                  {Companies.map((e) => (
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
                Nombre <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="Name"
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Apellidos <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={lastname}
                  onChange={(event) => setlastname(event.target.value)}
                  autoComplete="Name"
                  className="block w-full mr-10 rounded-md border-0 px-2 py-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Email <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Teléfono <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="remote"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Remoto <span className="text-orange">*</span>
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="remote"
                  id="remote"
                  value={remote}
                  onChange={(event) => setRemote(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="charge"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Cargo
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="charge"
                  id="charge"
                  value={charge}
                  onChange={(event) => setCharge(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Linkedin
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={linkedin}
                  onChange={(event) => setLinkedin(event.target.value)}
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                 Preferencias género
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">

                <select
                   type="text"
                   name="gender"
                   id="gender"
                   value={gender}
                   onChange={(event) => setGender(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Seleciona una opción</option>
                  <option key={1} value="Mujer">
                    Mujer
                  </option>
                  <option key={2} value="Hombre">
                    Hombre
                  </option>
                  <option key={3} value="Otros">
                    Otros
                  </option>
                </select>
              </div>

            </div>


            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first_interview"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Primer entrevista 
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="first_interview"
                  id="first_interview"
                  value={first_interview}
                  onChange={(event) =>
                    setFirst_interview(event.target.value)
                  }
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last_interview"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Ultima entrevista 
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="last_interview"
                  id="last_interview"
                  value={last_interview}
                  onChange={(event) =>
                    setLast_interview(event.target.value)
                  }
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-2 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>

          
          <div className="flex justify-center">
          <button
            type="submit"
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
          >
            <a href="/recruiterstable">Añadir recruiter</a>
          </button>
          <button
            className="text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/recruiterstable">Ver recruiters</a>
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MolFormRecruitersCreate;
