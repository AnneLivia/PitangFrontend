import { createContext, useState, useEffect } from 'react';
import axios from '../services/api';
import { parseISO } from 'date-fns/fp';

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;

export const AppointmentsContext = createContext();

const AppointmentContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const initialFetch = () => {
    const schedules = localStorage.getItem(LOCALSTORAGE_KEY);
    // se não houver dados no localStorage
    if (!schedules) {
      return axios
        .get('/schedules')
        .then((response) => {
          setAppointments(response.data);
          // inserir os dados no localStorage para não precisar buscar na API outra vez
          // somente buscar se os dados no localstorage forem apagados = quando fechar o browser.
          localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(response.data));
        })
        .catch((err) => console.log(err));
    }

    // se houver dados no localStorage
    const schedulesJSON = JSON.parse(schedules);
    setAppointments(schedulesJSON);
  };

  // ao renderizar pela primeira vez, serão carregados os dados da api
  // ou do localstorage
  useEffect(() => {
    initialFetch();
  }, []);

  // quando houver mudança no tamanho do array, significa que houve a inserção de algum dado
  // ou remoção, então ordernar os appointments novamente e inserir os dados ordenados no localStorage
  useEffect(() => {
    setAppointments((appoint) =>
      appoint.sort((a, b) => {
        const isoA = parseISO(a.dateTimeAppointment);
        const isoB = parseISO(b.dateTimeAppointment);

        if (isoA < isoB) return -1;
        if (isoA === isoB) return 0;

        return 1;
      })
    );
  }, [appointments.length]);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        setAppointments,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentContextProvider;
