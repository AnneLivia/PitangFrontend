import { useState, useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomModal from '../../../components/Modal';
import axios from '../../../services/api';
import { toast } from 'react-toastify';
import { AppointmentsContext } from '../../../contexts/AppointmentsContext';

const ResultModal = ({ showModal, setShowModal }) => {
  // para atualizar dinamicamente
  const { appointments, updateOneItem } = useContext(AppointmentsContext);

  const [resultText, setResultText] = useState('');

  useEffect(() => {
    const appoint = appointments.find((appoints) => {
      return appoints._id === showModal.id;
    });

    // se houver um resultado salvo no bd, deve-se coloca-lo como default ao invez de ''
    if (appoint.resultText) setResultText(appoint.resultText);
  }, [appointments, showModal.id]);

  const handleSubmit = async () => {
    // somente irá inserir no banco de dados, se houver texto.
    if (resultText) {
      try {
        const response = await axios.put(`/schedules/${showModal.id}`, {
          resultText: resultText.trim(),
        });

        // id do item pra atualizar, key dinamica e o valor
        updateOneItem(showModal.id, 'resultText', response.data.resultText);

        toast.success('Observação inserida com sucesso!');

        setShowModal({ show: false, id: '' });
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
    }
  };

  return (
    <CustomModal
      showModal={showModal}
      setShowModal={setShowModal}
      title='Observações do atendimento'
      handleSubmit={handleSubmit}
    >
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Informe o resultado</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={resultText}
            onChange={(e) => setResultText(e.target.value)}
            maxLength={140}
          />
        </Form.Group>
      </Form>
    </CustomModal>
  );
};
export default ResultModal;
