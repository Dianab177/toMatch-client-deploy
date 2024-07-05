import {
  getCompanies,
  deleteCompanies,
} from "../../../service/CompaniesService";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProvinces } from "../../../service/ProvincesService";
import MenuCompanies from "./MenuCompanies";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MolTableCompaniesShowDelete() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    getCompanies()
      .then((response) => {
        setCompanies(response.data);
        setSelectedCompanies(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getProvinces()
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedCompanies.length > 0 &&
      selectedCompanies.length < companies.length;
    setChecked(selectedCompanies.length === companies.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedCompanies, companies]);

  function toggleAll() {
    if (selectedCompanies.length === 0) {
      return;
    }
    setSelectedCompanies(checked || indeterminate ? [] : selectedCompanies);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  function handleDelete() {
    if (selectedCompanies.length === 0) {
      console.warn("No companies selected to delete");
      return;
    }

    // Create an array of promises to delete each selected e
    const deletePromises = selectedCompanies.map((event) =>
      deleteCompanies(event.id)
    );

    // Delete all companiess in parallel
    Promise.all(deletePromises)
      .then((responses) => {
        console.log("Companies deleted successfully!");
        // Remove all deleted companies from the e state
        const deletedIds = selectedCompanies.map((event) => event.id);
        setCompanies(companies.filter((e) => !deletedIds.includes(e.id)));
        // Clear the selectedCompanies state
        setSelectedCompanies([]);
        setChecked(false);
        setIndeterminate(false);
      })
      .catch((error) => {
        console.error(`Error deleting events: ${error.message}`);
      });
  }
  return (
    <>
      <MenuCompanies />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-7">
              Lista de empresas
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
              type="button"
            >
              <a href="/companiescreate">Crear empresa</a>
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                {selectedCompanies.length > 0 && (
                  <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      onClick={() => handleDelete(selectedCompanies[0].id)}
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
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Empresas
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Ubicación
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Provincia
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Télefono
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Prioridad
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone3 ">
                    {companies.map((company) => (
                      <tr key={company.id}>
                        <td className="px-7 sm:px-6">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600"
                            checked={selectedCompanies.some(
                              (p) => p.id === company.id
                            )}
                            onChange={() => {
                              const checked = selectedCompanies.some(
                                (p) => p.id === company.id
                              );
                              if (checked) {
                                setSelectedCompanies(
                                  selectedCompanies.filter(
                                    (p) => p.id !== company.id
                                  )
                                );
                              } else {
                                setSelectedCompanies([
                                  ...selectedCompanies,
                                  company,
                                ]);
                              }
                            }}
                          />
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                            selectedCompanies.includes(company.id)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          {company.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {company.ubication}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                            provinces.find((r) => r.id === company.province_id)
                              ?.name
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {company.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {company.phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {company.priority}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/companiesedit/${company.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Editar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
