import {
  getPromotions,
  deletePromotions,
} from "../../../service/PromotionsServices";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getSchools } from "../../../service/SchoolsService";
import MenuSchool from "../mol-school/MenuSchools";



export default function MolTablePromotionsShowDelete() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getPromotions()
      .then((response) => {
        setPromotions(response.data);
        setSelectedPromotions(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getSchools()
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPromotions.length > 0 && selectedPromotions.length < promotions.length;
    setChecked(selectedPromotions.length === promotions.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPromotions, promotions]);

  function toggleAll() {
    if (selectedPromotions.length === 0) {
      return;
    }
    setSelectedPromotions(checked || indeterminate ? [] : selectedPromotions);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  function handleDelete() {
    if (selectedPromotions.length === 0) {
      console.warn("No Promotions selected to delete");
      return;
    }

const deletePromises = selectedPromotions.map((promotion) =>
deletePromotions(promotion.id)
);

// Delete all Promotionss in parallel
Promise.all(deletePromises)
.then((promotion) => {
  console.log("Promotions deleted successfully!");
  // Remove all deleted Promotionss from the Promotions state
  const deletedIds = selectedPromotions.map((promotion) => promotion.id);
  deletePromotions(promotions.filter((e) => !deletedIds.includes(e.id)));
  // Clear the selectedPromotions state
  setSelectedPromotions([]);
  setChecked(false);
  setIndeterminate(false);
})
.catch((error) => {
  console.error(`Error deleting Promotions: ${error.message}`);
});}
  return (
    <>
      <MenuSchool />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-7">
              Lista de promociones
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
              type="button"
            >
              <a href="/Promotionscreate">Añadir promoción</a>
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                {selectedPromotions.length > 0 && (
                  <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      onClick={() => handleDelete(selectedPromotions[0].id)}
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
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Promoción
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Escuela
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Abreviatura
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Nº de coders
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone3">
                    {promotions.map((promotion) => (
                      <tr key={promotion.id}>
                        <td className="px-7 sm:px-6">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-orange rounded border-orangel focus:ring-orange"
                            checked={selectedPromotions.some((p) => p.id === promotion.id)}
                            onChange={() => {
                              const checked = selectedPromotions.some((p) => p.id === promotion.id);
                              if (checked) {
                                setSelectedPromotions(selectedPromotions.filter((p) => p.id !== promotion.id));
                              } else {
                                setSelectedPromotions([...selectedPromotions,promotion,]);
                              }
                            }}
                          />
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-white">
                          {promotion.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {
                            schools.find((r) => r.id === promotion.school_id)
                              ?.name
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {promotion.nick}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {promotion.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/Promotionsedit/${promotion.id}`}
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
  );
}
