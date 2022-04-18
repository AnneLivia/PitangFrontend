import * as Yup from 'yup';
import formatDate from '../utils/formatDate';

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;
const MAX_PER_DAY_VACANCIES = 20;
const MAX_PER_HOUR_VACANCIES = 2;

// Função customizada que verificar se ainda tem vaga disponível para a data selecionada
// para ser usado no yup
const availableDate = (dateTime) => {
  // campo está vazio.
  if(!dateTime)
    return false;

  // pegando todos os dados salvos no localStorage
  // porque não pode usar o state Appointments aqui.
  // Precisa ser chamado dentro da função, para sempre buscar os dados atualizados
  const schedules = localStorage.getItem(LOCALSTORAGE_KEY);
  
  if (schedules) {
    // transformando para array
    const schedulesArray = JSON.parse(schedules);
    // não tem agendamento
    if(schedulesArray.length === 0) {
      return true;
    }
    
    let cont = 0;

    schedulesArray.forEach((sch) => {
      // checando apenas a data
      if (formatDate(sch.dateTimeAppointment) === formatDate(dateTime)) {
        cont += 1;
      }
    });

    // não tem mais vaga
    if (cont >= MAX_PER_DAY_VACANCIES) {
      return false;
    }

    return true;
  }

  // não tem nenhum agendamento, então está disponível
  return true;
};


// Função customizada que verificar se ainda tem exste vaga para um determinado horário
// considerando o limite de 2 pessoas 
const availableTime = (dateTime) => {
  // campo está vazio.
  if(!dateTime)
    return false;

  // pegando todos os dados salvos no localStorage
  // porque não pode usar o state Appointments aqui.
  const schedules = localStorage.getItem(LOCALSTORAGE_KEY);

  if (schedules) {
    // transformando para array
    const schedulesArray = JSON.parse(schedules);
    const conflicts = schedulesArray.filter((sche) => {
      return (
        formatDate(sche.dateTimeAppointment, false) ===
        formatDate(dateTime, false)
      );
    });

    // não tem mais vaga para esse horário
    if(conflicts.length >= MAX_PER_HOUR_VACANCIES)
      return false;

    return true;
  }

  return true;
}

// função que verifica se o horário é exato. ex: 7:00, 8:00, 9:00, etc.
const exactHour = (dateTime) => {
  // campo está vazio.
  if(!dateTime)
    return false;
  // formata a data para dd/MM/yyyy HH:mm
  // separa pelo espaço; pega apenas a hora [1]
  // e depois pega apenas o minuto
  const [, minute] = formatDate(dateTime, false, 'dd/MM/yyyy HH:mm')
    .split(' ')[1]
    .split(':');

  if(minute === '00')
    return true;

  return false;
}

const ScheduleSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('O nome é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  birthDate: Yup.date('Insira um data válida')
    .required('A data de nascimento é obrigatória')
    .nullable(),
  dateTimeAppointment: Yup.date('Insira uma data e hora válida')
    .required('A data e a hora do atendimento são obrigatórias')
    .test('dateTimeAppointment', 
      'O sistema atingiu seu número máximo de pacientes para esta data', 
      (dateTime) => availableDate(dateTime))
    .test('dateTimeAppointment', 
      'O limite de 2 pacientes simultâneos foi atingido para este horário', 
      (dateTime) => availableTime(dateTime))
    .test('dateTimeAppointment', 
      'Horário Inválido. Escolha uma hora exata (00 minutos)', 
      (dateTime) => exactHour(dateTime))
    .nullable(),
});

export default ScheduleSchema;
