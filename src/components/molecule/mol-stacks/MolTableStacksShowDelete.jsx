import { getStacks, deleteStacks } from "../../../service/StacksService";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MolMenuAdmin from "../mol-regions/MolMenuAdmin";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MolTableStacksShowDelete() {
  
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    getStacks()
      .then((response) => {
        setStacks(response.data);
        setSelectedStacks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedStacks.length > 0 && selectedStacks.length < stacks.length;
    setChecked(selectedStacks.length === stacks.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedStacks, stacks]);
  
  function toggleAll() {
    if (selectedStacks.length === 0) {
      return;
    }
    setSelectedStacks(checked || indeterminate ? [] : selectedStacks)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  function handleDelete() {
    if (selectedStacks.length === 0) {
      console.warn("No Stackss selected to delete");
      return;
    }

    // Create an array of promises to delete each selected Stacks
    const deletePromises = selectedStacks.map((Stacks) =>
      deleteStacks(Stacks.id)
    );

    // Delete all Stackss in parallel
    Promise.all(deletePromises)
      .then((responses) => {
        console.log("Stackss deleted successfully!");
        // Remove all deleted Stackss from the Stacks state
        const deletedIds = selectedStacks.map((stacks) => stacks.id);
        setStacks(stacks.filter((e) => !deletedIds.includes(e.id)));
        // Clear the selectedStacks state
        setSelectedStacks([]);
        setChecked(false);
        setIndeterminate(false);
      })
      .catch((error) => {
        console.error(`Error deleting Stackss: ${error.message}`);
      });
  }
  return (
    <>
    <MolMenuAdmin/>
    <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Lista de Stacks</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
            className="text-sm text-stone2 my-10 mx-10 px-6 py-1.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/stackscreate">Crear Stacks</a>
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedStacks.length > 0 && (
                <div className="block left-14 top-0 h-12 items-center space-x-3 sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                     onClick={() => handleDelete(selectedStacks[0].id)}
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
                      Stacks
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {stacks.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-7 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          name={e.id}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedStacks.some((ev) => ev.id === e.id)}
                          onChange={(Stacks) => {
                            const isChecked = Stacks.target.checked;
                            setSelectedStacks((prevState) => {
                              if (isChecked) {
                                return [...prevState, e];
                              } else {
                                return prevState.filter((ev) => ev.id !== e.id);
                              }
                            });
                          }}
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedStacks.includes(e.id) ? 'text-indigo-600' : 'text-gray-900'
                        )}
                      >
                        {e.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.url}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.max}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.min}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/stacksedit/${e.id}`}
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
  )
}
