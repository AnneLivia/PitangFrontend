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
          // somente buscar se os dados no localstorage forem apagados.
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

  // para atualizar um campo especifico, recebe como parametro, o id do agendamento
  // o campo para ser atualizado e o valor
  const updateOneItem = (id, key, value) => {
    // atualizar o state
    // copiando todos os dados
    const appoints = [...appointments];

    // obtendo o index em que o item a ser atualizado se encontra
    const index = appoints.findIndex((appoint) => appoint._id === id);

    // copiando todos os dados desse item especifico, atualizando apenas o value
    // da key e colocando o novo objeto na posição correspondente
    appoints[index] = { ...appoints[index], [key]: value };

    // setando o novo estado
    setAppointments(appoints);

    // atualizando o localStorage também (os dados ficarão ordenados no localStorage)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appoints));
  };

  // para inserir um novo dado, tanto no localStorage, quando no state.
  const insertNewAppointment = (data) => {
    // copiando todos os dados
    const appoints = [...appointments];

    // inserindo no localStorage, os dados já inseridos + o novo dado
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([...appoints, data]));

    // Atualizando o state, inserindo o novo dado
    setAppointments([...appoints, data]);
  };

  const refetch = () => {
    console.log('Buscando os dados novamente através da API');
    // Removendo o localstorage
    localStorage.clear();
    // populando o state appointments e o localStorage novamente.
    initialFetch();
  };

  // quando houver mudança no tamanho do array, significa que houve a inserção de algum dado
  // ou remoção, então ordernar os appointments novamente
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
        updateOneItem,
        insertNewAppointment,
        refetch,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentContextProvider;
