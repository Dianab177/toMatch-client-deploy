import React from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies, deleteCompanies } from "../../../service/MatchesService";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { extendTheme } from "@mui/joy";
import { data } from "autoprefixer";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: "#C0CCD9",
          100: "#A5B8CF",
          200: "#6A96CA",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: theme.colorSchemes.dark.palette.primary[500],
    },
    background: {
      paper: theme.colorSchemes.dark.palette.primary[900],
      default: theme.colorSchemes.dark.palette.primary[800],
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h5: {
            color: "#FF4700",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

const MolTableMatchesFilterExcel = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies()
      .then((response) => {
        setCompanies(response.data);
        setSelectedCompanies(response.data);
      })
      .catch((error) => console.error(error));
  }, [data]);

  const columns = [
    {
      name: "name",
      label: "EMPRESA",
    },
    {
      name: "ubication",
      label: "UBICACIÓN",
    },
    {
      name: "email",
      label: "EMAIL",
    },
    {
      name: "phone",
      label: "PHONE",
    },
    {
      name: "priority",
      label: "PRIORIDAD",
    },

  ];

  const options = {
    download: true,
    downloadOptions: {
      filename: "empresas.xlsx",
      separator: ",",
    },
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const matchesCreate = await createMatch();
  //     console.log(matchesCreate);

  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "¡Tu match se ha creado con éxito!",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     }); 
  //     setTimeout(() => {
  //       navigate("/match");
  //     }, 2000); 
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: "Ha habido un problema, ¡prueba de nuevo!",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   }
  // };

  return (
    <>
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-10 my-15 text-white">
        <div className="w-full flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-block end-0 text-sm text-white my-5 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verde1 ..."
          >
            Eliminar
          </button>
        </div>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            className="custom-class"
            title={<h4 style={{ color: "#FF4700" }}>{"Lista de empresas"}</h4>}
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default MolTableMatchesFilterExcel;
