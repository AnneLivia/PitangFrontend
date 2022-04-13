import * as Yup from 'yup';

const ScheduleSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  birthDate: Yup.date('Insira um data válida')
    .required('A data de nascimento é obrigatória')
    .nullable(),
  dateTimeAppointment: Yup.date('Insira uma data e hora válida')
    .required('A data e hora do atendimento é obrigatória')
    .nullable(),
});

export default ScheduleSchema;
