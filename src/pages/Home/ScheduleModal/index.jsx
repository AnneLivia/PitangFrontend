import { useContext } from 'react';
import { AppointmentsContext } from '../../../contexts/AppointmentsContext';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ScheduleDatePicker from '../../../components/DatePicker';
import axios from '../../../services/api';
import formatDate from '../../../utils/formatDate';
import CustomModal from '../../../components/Modal';

// validation
import { useFormik } from 'formik';
import ScheduleSchema from '../../../validators/ScheduleSchema';

// style
import './index.css';

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;

const ScheduleModal = ({ showModal, setShowModal }) => {
  const { appointments, setAppointments } = useContext(AppointmentsContext);

  const formik = useFormik({
    initialValues: {
      birthDate: new Date('01/01/1990'),
      dateTimeAppointment: null,
      name: '',
    },
    validationSchema: ScheduleSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // formatando as datas para que esteja de acordo com a API
        const birthDate = formatDate(values.birthDate, true, 'MM/dd/yyyy');
        const dateTimeAppointment = formatDate(
          values.dateTimeAppointment,
          false,
          'MM/dd/yyyy HH:mm'
        );

        // inserindo no bd, os dados requeridos
        const response = await axios.post('/schedules', {
          name: values.name,
          birthDate,
          dateTimeAppointment,
        });

        // inserindo o novo dado
        setAppointments((oldAppointments) => [
          ...oldAppointments,
          response.data,
        ]);

        // inserindo no localStorage
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify([...appointments, response.data])
        );

        toast.success('Agendado com sucesso!');

        resetForm();

        // para fechar o modal
        setShowModal(false);
      } catch (err) {
        if (err.response) {
          // se não houver uma lista de erros retornadas pelo JOI, exibir apenas a mensagem
          if (!err.response.data.errors)
            return toast.error(err.response.data.message);

          // caso contrário, para cada erro, exibir um toast
          return err.response.data.errors.forEach((data) => toast.error(data));
        }

        toast.error(err.message);
      }
    },
  });

  return (
    <CustomModal
      showModal={showModal}
      setShowModal={setShowModal}
      title='Agendar nova vacinação'
      handleSubmit={formik.handleSubmit}
      confirmButton={{ name: 'Agendar', variant: 'success' }}
    >
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='name'>Nome Completo: </Form.Label>
          <Form.Control
            placeholder='Digite o seu nome'
            type='text'
            name='name'
            id='name'
            autoFocus
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.name}
            isValid={!formik.errors.name && formik.values.name !== ''}
          />
          {formik.errors.name ? (
            <div className='mt-1 ms-1 invalid_input_info'>
              {formik.errors.name}
            </div>
          ) : null}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Data de nascimento: </Form.Label>
          <ScheduleDatePicker
            name='birthDate'
            dateFormat='dd/MM/yyyy'
            date={formik.values.birthDate}
            onChange={(e) => formik.setFieldValue('birthDate', e)}
            placeholderText='Selecione uma data válida'
            maxDate={new Date()}
            autoComplete='off'
            className={`form-control ${
              !formik.errors.birthDate ? '' : 'is-invalid'
            }`}
          />
          {formik.errors.birthDate ? (
            <div className='mt-1 ms-1 invalid_input_info'>
              {formik.errors.birthDate}
            </div>
          ) : null}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Data e hora de atendimento: </Form.Label>
          <ScheduleDatePicker
            name='appointmentDate'
            dateFormat='dd/MM/yyyy HH:mm'
            timeFormat='HH:mm'
            minDate={new Date()}
            date={formik.values.dateTimeAppointment}
            onChange={(e) => formik.setFieldValue('dateTimeAppointment', e)}
            showTimeSelect
            placeholderText='DD/MM/YYYY HH:MM'
            className={`form-control ${
              !formik.errors.dateTimeAppointment ? '' : 'is-invalid'
            }`}
            autoComplete='off'
          />
          {formik.errors.dateTimeAppointment ? (
            <div className='mt-1 ms-1 invalid_input_info'>
              {formik.errors.dateTimeAppointment}
            </div>
          ) : null}
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

export default ScheduleModal;
