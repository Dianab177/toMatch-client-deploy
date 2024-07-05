import { getSchools, deleteSchools } from "../../../service/SchoolsService";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuSchool from "./MenuSchools";
import { getProvinces } from "../../../service/ProvincesService";


export default function MolTableSchoolsShowDelete() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [schools, setSchools] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    getSchools()
      .then((response) => {
        setSchools(response.data);
        setSelectedSchools(response.data);
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
      selectedSchools.length > 0 && selectedSchools.length < schools.length;
    setChecked(selectedSchools.length === schools.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedSchools, schools]);

  function toggleAll() {
    if (selectedSchools.length === 0) {
      return;
    }
    setSelectedSchools(checked || indeterminate ? [] : selectedSchools);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  function handleDelete() {
    if (selectedSchools.length === 0) {
      console.warn("No Schools selected to delete");
      return;
    }

    // Create an array of promises to delete each selected Schools
    const deletePromises = selectedSchools.map((schools) =>
      deleteSchools(schools.id)
    );

    // Delete all Schoolss in parallel
    Promise.all(deletePromises)
      .then((responses) => {
        console.log("Schools deleted successfully!");
        // Remove all deleted Schoolss from the Schools state
        const deletedIds = selectedSchools.map((schools) => schools.id);
        setSchools(schools.filter((e) => !deletedIds.includes(e.id)));
        // Clear the selectedSchools state
        setSelectedSchools([]);
        setChecked(false);
        setIndeterminate(false);
      })
      .catch((error) => {
        console.error(`Error deleting Schools: ${error.message}`);
      });
  }
  return (
    <>
      <MenuSchool />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-7">
              Lista de escuelas
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
              type="button"
            >
              <a href="/schoolscreate">Añadir escuela</a>
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                {selectedSchools.length > 0 && (
                  <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      onClick={() => handleDelete(selectedSchools[0].id)}
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
                        Escuela
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Ubicación
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Latitud
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Longitud
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {schools.map((school) => (
                      <tr key={school.id}>
                        <td className="px-7 sm:px-6">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600"
                            checked={selectedSchools.some(
                              (e) => e.id === school.id
                            )}
                            onChange={() => {
                              const checked = selectedSchools.some(
                                (e) => e.id === school.id
                              );
                              if (checked) {
                                setSelectedSchools(
                                  selectedSchools.filter(
                                    (e) => e.id !== school.id
                                  )
                                );
                              } else {
                                setSelectedSchools([
                                  ...selectedSchools,
                                  school,
                                ]);
                              }
                            }}
                          />
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-white">{school.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                            provinces.find((r) => r.id === school.province_id)
                              ?.name
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {school.lat}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {school.long}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/schoolsedit/${school.id}`}
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
