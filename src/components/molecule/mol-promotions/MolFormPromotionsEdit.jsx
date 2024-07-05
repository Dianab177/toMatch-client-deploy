import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPromotionsById,
  updatePromotions,
} from "../../../service/PromotionsServices";
import { getSchools } from "../../../service/SchoolsService";
import Swal from "sweetalert2";
import MenuSchool from "../mol-school/MenuSchools";


const MolFormPromotionsEdit = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [school_id, setSchool_id] = useState("");
  const [schools, setSchools] = useState([]);
  const [nick, setNick] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const { data } = await getPromotionsById(id);
        setName(data.promo.name);
        setSchool_id(data.promo.school_id);
        setNick(data.promo.nick);
        setQuantity(data.promo.quantity);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromotion();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      [name, school_id, nick, quantity].some(
        (value) => value === undefined
      )
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
        school_id,
        nick,
        quantity,
      };

      await updatePromotions(id, eventData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡La promoción se ha actualizado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/promotionstable");
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
    getSchools()
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <MenuSchool />
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
        <h2 className="text-2xl font-semibold leading-7 text-orange">
          Editar promoción
        </h2>

        <form className="bg-stone6" onSubmit={handleSubmit}>
          <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="company-name"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Promoción <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Inserte nombre de la promoción."
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="school_id"
                className="block text-sm font-medium leading-6 text-white sm:pt-1.5"
              >
                Escuela <span className="text-orange">*</span>
              </label>
              <select
                type="text"
                name="school_id"
                id="school_id"
                value={school_id} // Cambiar 'regions' por el estado que representa la opción seleccionada
                onChange={(event) => setSchool_id(event.target.value)} // Cambiar 'setRegions' por el método que actualiza el estado de la opción seleccionada
                className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {schools.map((e) => (
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
                Abreviatura de la promoción <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="nick"
                  name="nick"
                  type="text"
                  value={nick}
                  onChange={(event) => setNick(event.target.value)}
                  placeholder="Inserte abreviatura de la promoción."
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
                Nº de coders <span className="text-orange">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  placeholder="Inserte número de coders."
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5  text-stone6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
          <button
            type="submit"
            className="text-sm my-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orangel hover:from-verde hover:to-verdel ..."
          >
            Editar promoción
          </button>
          <button
            className="text-sm my-10 mx-10 px-24 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verdel ..."
            type="button"
          >
            <a href="/promotionstable">Ver promociones</a>
          </button>
        </form>
      </div>
    </>
  );
};

export default MolFormPromotionsEdit;