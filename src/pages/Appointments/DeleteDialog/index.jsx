import React, { useContext } from 'react';
import CustomModal from '../../../components/Modal';
import axios from '../../../services/api';
import { toast } from 'react-toastify';
import { AppointmentsContext } from '../../../contexts/AppointmentsContext';

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;

const WarningDialog = ({ showModal, setShowModal }) => {
  const { appointments, setAppointments } = useContext(AppointmentsContext);

  // para remover o agendamento
  const handleOnDelete = async () => {
    try {
      await axios.delete(`/schedules/${showModal.id}`);

      // removendo o agendamento do state
      const appoints = appointments.filter(
        (appoint) => appoint._id !== showModal.id
      );

      setAppointments(appoints);

      // removendo do localStorage também
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appoints));

      toast.success('O agendamento foi removido com sucesso', {
        position: 'bottom-right',
      });

      setShowModal({ show: false, id: '' });
    } catch (err) {
      // se alguma resposta foi retornada pela API
      if (err.response) {
        return toast.error(err.response.data.message, {
          position: 'bottom-right',
        });
      }

      toast.error(err.message);
    }
  };

  return (
    <CustomModal
      showModal={showModal}
      setShowModal={setShowModal}
      title='Remover agendamento'
      handleSubmit={handleOnDelete}
      confirmButton={{ name: 'Remover', variant: 'danger' }}
    >
      Você tem certeza que deseja remover esse agendamento?
    </CustomModal>
  );
};

export default WarningDialog;
