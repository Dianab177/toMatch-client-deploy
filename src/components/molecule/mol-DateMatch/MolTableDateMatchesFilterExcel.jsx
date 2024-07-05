import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSchedule, createSchedule } from "../../../service/ScheduleService";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { extendTheme } from "@mui/joy";

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

function MolTableMatchesFilterExcel() {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSchedule()
      .then((response) => {
        const schedules = response.data.map((schedule) => ({
          nameEvent: schedule.nameEvent,
          nameCompany: schedule.nameCompany,
          nameRecruiter: schedule.nameRecruiter,
          nameCoder: schedule.nameCoder,
          afinity: schedule.afinity,
          interview: schedule.interview,
        }));
        setSchedule(schedules);
      })
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    {
      name: "nameEvent",
      label: "EVENTO",
    },
    {
      name: "nameCompany",
      label: "COMPAÑIA",
    },
    {
      name: "nameRecruiter",
      label: "RECRUITER",
    },
    {
      name: "nameCoder",
      label: "CODER",
    },
    {
      name: "afinity",
      label: "AFINIDAD",
    },
    {
      name: "interview",
      label: "Entrevista",
    },
  ];

  const options = {
    download: true,
    downloadOptions: {
      filename: "agenda_evento.xlsx",
      separator: ",",
    },
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const scheduleCreate = await createSchedule();
      console.log(scheduleCreate);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Tu agenda se ha creado con éxito!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/datematches");
      }, 2000);
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
      <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-10 my-15 text-white">
        <div className="w-full flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-block end-0 text-sm text-white my-10 mx-10 px-12 py-3.5 rounded-xl bg-gradient-to-r from-orangel to-orange hover:from-verde hover:to-verde1 ..."
          >
            Crear Agenda
          </button>
        </div>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            className="custom-class"
            title={<h5 style={{ color: "#FF4700" }}>{"Agenda Evento"}</h5>}
            data={schedule}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default MolTableMatchesFilterExcel;
