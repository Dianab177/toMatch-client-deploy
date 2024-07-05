import { getCoders, deleteCoders } from "../../../service/CodersService";
import { getPromotions } from "../../../service/PromotionsServices";
import { getEvento } from "../../../service/EventService";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuSchool from "../mol-school/MenuSchools";



export default function MolTableCodersShowDelete() {
  
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedCoders, setSelectedCoders] = useState([]);
  const [coders, setcoders] = useState([]);
  const [event, setEvent] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    getCoders()
      .then((response) => {
        setcoders(response.data);
        setSelectedCoders(response.data);
        console.log(response);
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
    getPromotions()
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedCoders.length > 0 && selectedCoders.length < coders.length;
    setChecked(selectedCoders.length === coders.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedCoders, coders]);
  
  function toggleAll() {
    if (selectedCoders.length === 0) {
      return;
    }
    setSelectedCoders(checked || indeterminate ? [] : selectedCoders)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  function handleDelete() {
    if (selectedCoders.length === 0) {
      console.warn("No coders selected to delete");
      return;
    }

    // Create an array of promises to delete each selected coders
    const deletePromises = selectedCoders.map((coders) =>
    deleteCoders(coders.id)
    );

    // Delete all coderss in parallel
    Promise.all(deletePromises)
      .then((responses) => {
        console.log("coders deleted successfully!");
        // Remove all deleted coderss from the coders state
        const deletedIds = selectedCoders.map((coders) => coders.id);
        setcoders(coders.filter((e) => !deletedIds.includes(e.id)));
        // Clear the selectedCoders state
        setSelectedCoders([]);
        setChecked(false);
        setIndeterminate(false);
      })
      .catch((error) => {
        console.error(`Error deleting coderss: ${error.message}`);
      });
  }
  return (
    <>
    <MenuSchool/>
    <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Lista de coders</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
            className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/codercreate">Añadir coders</a>
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedCoders.length > 0 && (
                <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                     onClick={() => handleDelete(selectedCoders[0].id)}
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
                      Nombre del coder
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Promoción
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Evento
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Género
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Edad
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Teléfono
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Linkedin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      GitHub
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Remoto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Disponibilidad
                    </th>

                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone3 ">
                {/* {coders.map((e) => {
                  const promotion = promotions.find((p) => p.id === e.promo_id);
                  const events = event.find((p) => p.id === e.event_id);
                  return (
                    <tr key={e.id}>
                      <td className="px-7 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedCoders.includes(e)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSelectedCoders((prev) =>
                              isChecked
                                ? [...prev, e]
                                : prev.filter((c) => c !== e)
                            );
                          }}
                        />
                      </td> */}
                         {coders.map((coder) => (
                       <tr key={coder.id}>
                        <td className="px-7 sm:px-6">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-orange rounded border-stone3 focus:ring-orange"
                            checked={selectedCoders.some((e) => e.id === coder.id)}
                            onChange={() => {
                              const checked = selectedCoders.some((e) => e.id === coder.id);
                              if (checked) {
                                setSelectedCoders(selectedCoders.filter((e) => e.id !== coder.id));
                              } else {
                                setSelectedCoders([...selectedCoders, coder]);
                              }
                            }}
                          />
                        </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-white">{coder.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {promotions.find((e) => e.id === coder.promotion_id)?.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {event.find((e) => e.id === coder.event_id)?.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.gender}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.years}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.linkedin}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.github}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.remote}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                        {coder.avaliability}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/coderedit/${coder.id}`}
                          className="text-orangel hover:text-orange"
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
  )
}
