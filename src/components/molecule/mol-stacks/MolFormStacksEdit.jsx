import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStacksById, updateStacks } from "../../../service/StacksService";
import Swal from "sweetalert2";
import MolMenuAdmin from "../mol-regions/MolMenuAdmin";

const MolFormStacksEdit = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const { data } = await getStacksById(id);
        setName(data.stack.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvento();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const coderData = {
        name
      };

      await updateStacks(id, coderData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu stack se ha actualizado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/stackstable");
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


 
  return (
    <>
    <MolMenuAdmin/>
    <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">Editar stacks</h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
        <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0"> </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Nombre del stack
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

          <button
            type="submit"
            className="text-sm my-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orangel hover:from-verde hover:to-verdel ..."
          >
            Editar stack
          </button>

          <button
            className="text-sm my-10 mx-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/codertable">Ver Stack</a>
          </button>

        </form>
      </div>
    </>
  );
}

export default MolFormStacksEdit;
