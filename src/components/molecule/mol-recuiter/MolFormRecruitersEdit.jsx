import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRecruitersById,
  updateRecruiters,
  updateRecruitersStacksAttach,
  updateRecruitersLanguagesAttach,
} from "../../../service/RecruitersService";
import { getCompanies } from "../../../service/CompaniesService";
import { getEvento } from "../../../service/EventService";
import { getStacks } from "../../../service/StacksService";
import { getLanguages } from "../../../service/LanguagesService";
import MenuCompanies from "../mol-companies/MenuCompanies";
import Swal from "sweetalert2";

const MolFormRecruitersEditcopy = ({ prop }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [stacks, setStacks] = useState([]);
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
  const [stack_id, setStack_id] = useState("");
  const [language_id, setLanguage_id] = useState(""); 

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const { data } = await getRecruitersById(id);
        setEventId(data.recruiter.event_id);
        setCompanyId(data.recruiter.company_id);
        setName(data.recruiter.name);
        setlastname(data.recruiter.lastname);
        setCharge(data.recruiter.charge);
        setFirst_interview(data.recruiter.first_interview);
        setLast_interview(data.recruiter.last_interview);
        setRemote(data.recruiter.remote);
        setEmail(data.recruiter.email);
        setPhone(data.recruiter.phone);
        setLinkedin(data.recruiter.linkedin);
        setGender(data.recruiter.gender);
        
        
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecruiters();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      [
        event_id,
        company_id,
        name,
        lastname,
        first_interview,
        last_interview,
        charge,
        remote,
        email,
        phone,
        linkedin,
      ].some((value) => value === undefined)
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
      const recruiterData = {
        event_id,
        company_id,
        name,
        lastname,
        remote,
        email,
        phone,
        linkedin,
        first_interview,
        last_interview,
        charge,
      };

      await updateRecruiters(id, recruiterData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu recruiter se ha actualizado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/recruiterstable");
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
  useEffect(() => {
    getLanguages()
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getStacks()
      .then((response) => {
        setStacks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);



  const handleChangeStacks = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("stack_id", stack_id);

      const attachLanguageCreate = await updateRecruitersLanguagesAttach(id);
      console.log(attachLanguageCreate);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeLenguages = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("language_id", language_id);
      const attchStacksCreate = await updateRecruitersStacksAttach(id);
      console.log(attchStacksCreate);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MenuCompanies />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Editar Recruiter
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="event_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Evento <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  type="text"
                  name="event_id"
                  id="event_id"
                  value={event_id}
                  onChange={(event) => setEventId(event.target.value)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {event &&
                    event.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="province_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Nombre de la empresa <span className="text-orange">*</span>
              </label>
              <select
                type="text"
                name="companies_id"
                id="companies_id"
                value={company_id} // Cambiar 'regions' por el estado que representa la opción seleccionada
                onChange={(event) => setCompanyId(event.target.value)} // Cambiar 'setRegions' por el método que actualiza el estado de la opción seleccionada
                className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {companies &&
                  companies.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Nombre <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="nombre"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6  text-white sm:pt-1.5"
              >
                Apellidos <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={lastname}
                  onChange={(event) => setlastname(event.target.value)}
                  autoComplete="lastname"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
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
                En remoto 
              </label>
              <div className="flex mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="remote"
                  id="remoten"
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
                  className="block w-full rounded-md border-0 mr-10 py-1.5 px-1.5 text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
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

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="stack_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                 Stacks
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <form onChange={handleChangeStacks}>
                <select
                type="text"
                name="stack_id"
                id="stack_id"
                value={stack_id} 
                onChange={(event) => setStack_id(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Seleciona una opción</option>
                {stacks &&
                  stacks.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>

                </form>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="language_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                 Lenguages
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <form onChange={handleChangeLenguages}>
                <select
                type="text"
                name="language_id"
                id="language_id"
                value={language_id} 
                onChange={(event) => setLanguage_id(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Seleciona una opción</option>
                {languages &&
                  languages.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>

                </form>
              </div>
            </div>
            
          </div>

          <button
            type="submit"
            className="text-sm my-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orangel hover:from-verde hover:to-verdel ..."
          >
            Editar recruiter
          </button>

          <button
            className="text-sm my-10 mx-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/recruiterstable">Ver recruiters</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default MolFormRecruitersEditcopy;
