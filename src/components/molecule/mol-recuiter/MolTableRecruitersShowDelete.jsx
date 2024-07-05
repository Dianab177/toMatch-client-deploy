import { getRecruiters, deleteRecruiters } from "../../../service/RecruitersService";
import { getEvento } from "../../../service/EventService";
import { getCompanies} from "../../../service/CompaniesService";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuCompanies from "../mol-companies/MenuCompanies";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MolTableRecruitersShowDelete() {
  
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [events, setEvent] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getRecruiters()
      .then((response) => {
        setRecruiters(response.data);
        setSelectedRecruiters(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

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

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRecruiters.length > 0 && selectedRecruiters.length < recruiters.length;
    setChecked(selectedRecruiters.length === recruiters.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedRecruiters, recruiters]);
  
  function toggleAll() {
    if (selectedRecruiters.length === 0) {
      return;
    }
    setSelectedRecruiters(checked || indeterminate ? [] : selectedRecruiters)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  function handleDelete() {
    if (selectedRecruiters.length === 0) {
      console.warn("No Recruiters selected to delete");
      return;
    }

    // Create an array of promises to delete each selected Recruiters
    const deletePromises = selectedRecruiters.map((recruiters) =>
    deleteRecruiters(recruiters.id)
    );

    // Delete all Recruiterss in parallel
    Promise.all(deletePromises)
      .then((responses) => {
        console.log("Recruiters deleted successfully!");
        // Remove all deleted Recruiterss from the Recruiters state
        const deletedIds = selectedRecruiters.map((recruiters) => recruiters.id);
        setRecruiters(recruiters.filter((e) => !deletedIds.includes(e.id)));
        // Clear the selectedRecruiters state
        setSelectedRecruiters([]);
        setChecked(false);
        setIndeterminate(false);
      })
      .catch((error) => {
        console.error(`Error deleting Recruiters: ${error.message}`);
      });
  }
  return (
  <>
    <MenuCompanies />
    <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Lista de Recruiters</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
            className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/recruiterscreate">Añadir Recruiters</a>
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedRecruiters.length > 0 && (
                <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                     onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Evento
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Empresa
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Apellidos
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Cargo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Teléfono
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Primer entrevista
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Última entrevistas
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Remoto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Linkedin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Preferencia género
                    </th>
                   
                   
                   
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {recruiters.map((e) => {
                    const event = events.find((p) => p.id === e.event_id);
                    const company = companies.find((c) => c.id === e.company_id);
                    return (
                      <tr key={e.id}>
                        <td className="px-7 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={selectedRecruiters.includes(e)}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setSelectedRecruiters((prev) =>
                                isChecked
                                  ? [...prev, e]
                                  : prev.filter((c) => c !== e)
                              );
                            }}
                            
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedRecruiters.includes(e.id) ? 'text-indigo-600' : 'text-gray-900'
                        )}
                      >
                        {event ? event.name : "-" }
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.name}</td> */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {company ? company.name : '-'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.lastname}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.charge}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.phone}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.first_interview}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.last_interview}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.remote}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {e.linkedin}</td>
                      
                     
                      
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/recruitersedit/${e.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
