import React, { useContext, useState } from 'react';
import {
  Container,
  Table,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setHours, setMinutes } from 'date-fns';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';

import CustomToggle from '../../components/ToggleButton';
import DatePicker from '../../components/DatePicker';
import CustomCard from '../../components/Card';
import CustomNavbar from '../../components/Navbar';
import CustomDropdown from '../../components/Dropdown';

import DeleteDialog from './DeleteDialog';
import ResultModal from './ResultModal';
import formatDate from '../../utils/formatDate';

import axios from '../../services/api';

// icons
import { FiMoreHorizontal } from 'react-icons/fi';

import report_svg from '../../assets/images/report.svg';
import remove_svg from '../../assets/images/remove.svg';

// css para estilizar o footer da tabela
import './index.css';

const Appointments = () => {
  const { appointments, updateOneItem } = useContext(AppointmentsContext);
  // para buscar por data, setando o dia atual
  const [date, setDate] = useState(setHours(setMinutes(new Date(), 0), 0));
  // para filtrar por nome
  const [name, setName] = useState('');

  // para abrir o modal referente ao resultado do atendimento
  const [showModalUpdateText, setShowModalUpdateText] = useState({
    show: false,
    id: '',
  });

  // para abrir o dialog referente a confirmação da remoção do agendamento
  const [showDialogDelete, setShowDialogDelete] = useState({
    show: false,
    id: '',
  });

  // para exibir os agendamentos agrupados por uma data selecionada ou exibir todos
  // default é agrupado por data selecionada
  const [radioValue, setRadioValue] = useState('2');

  // para atualizar o status do agendamento entre Atendido, não atendido ou Agendado
  const handleOnSelect = async (event, id) => {
    // atualizar na base de dados o status
    try {
      await axios.put(`/schedules/${id}`, {
        statusAppointment: event,
      });

      // atualizar o state automaticamente (id, key dinamica e o valor)
      updateOneItem(id, 'statusAppointment', event);

      toast.success('Atualizado com sucesso', { position: 'bottom-right' });
    } catch (error) {
      // se alguma resposta foi retornada pela API
      if (error.response) {
        return toast.error(error.response.data.message, {
          position: 'bottom-right',
        });
      }

      toast.error(error.message);
    }
  };

  const handleResultModal = (id) => {
    // id, para requisicao na api
    // show: true, para exibir o modal
    setShowModalUpdateText({ show: true, id });
  };

  const handleWarningDialogDelete = (id) => {
    // id, para requisicao na api
    // show: true, para exibir o modal
    setShowDialogDelete({ show: true, id });
  };

  return (
    <>
      {showModalUpdateText.show && (
        <ResultModal
          showModal={showModalUpdateText}
          setShowModal={setShowModalUpdateText}
        />
      )}
      {showDialogDelete.show && (
        <DeleteDialog
          showModal={showDialogDelete}
          setShowModal={setShowDialogDelete}
        />
      )}
      <CustomNavbar>
        <div className='d-flex'>
          <FormControl
            type='search'
            placeholder='Pesquisar por nome'
            className='me-2'
            value={name}
            aria-label='Search'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </CustomNavbar>
      <Container className='mt-4 w-100 justify-content-center'>
        <CustomCard title='Lista de agendamentos'>
          <Row>
            <Col md={2}>
              <DatePicker
                className='form-control custom_datePicker'
                date={date}
                onChange={(e) => setDate(e)}
                dateFormat='dd/MM/yyyy'
              />
            </Col>
            <Col>
              <CustomToggle
                radioValue={radioValue}
                setRadioValue={setRadioValue}
              />
            </Col>
          </Row>
          <Table bordered hover size='sm' responsive className='mt-3'>
            <thead>
              <tr className='text-center'>
                <th>#</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Data e Hora do Atendimento</th>
                <th>Status</th>
                <th>Resultado</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((appoint) => {
                  // primeiro filtro é para buscar por nome independentemente da data
                  if (name) {
                    return appoint.name
                      .toLowerCase()
                      .includes(name.toLowerCase().trim());
                  }

                  // obtendo apenas a data para verificar os items que precisam ser exibido
                  const dateAppointment = formatDate(
                    appoint.dateTimeAppointment
                  );

                  const selectedSearchByDate = formatDate(date);

                  // se a data nao corresponder a selecionada, mas o radioValue for 2, nao exibirá nada
                  // se a data corresponder ou nao e o radiovalue for 1, exibirá tudo.

                  // é para exibir apenas os agendamentos para a data selecionada
                  if (radioValue === '2')
                    return dateAppointment === selectedSearchByDate;

                  // se radioValue não for '2', retorna tudo
                  return appoint;
                })
                .map((appointment, index) => {
                  // apos filtrar, faz o map.
                  return (
                    <tr key={appointment._id}>
                      <th className='text-center'>{index + 1}</th>
                      <td>{appointment.name}</td>
                      <td className='text-center'>
                        {formatDate(appointment.birthDate)}
                      </td>

                      <td className='text-center'>
                        {formatDate(appointment.dateTimeAppointment, false)}
                      </td>
                      <td className='text-center'>
                        {
                          <CustomDropdown
                            options={[
                              {
                                name: 'AGENDADO',
                                variant: 'outline-primary',
                              },
                              {
                                name: 'ATENDIDO',
                                variant: 'outline-success',
                              },
                              {
                                name: 'NÃO ATENDIDO',
                                variant: 'outline-danger',
                              },
                            ]}
                            selected={appointment.statusAppointment}
                            handleOnSelect={(event) => {
                              // preciso passar o index, para mudar dinamicamente o state ao atualizar
                              handleOnSelect(event, appointment._id);
                            }}
                          />
                        }
                      </td>
                      <td className='text-center'>
                        <Button
                          onClick={() => handleResultModal(appointment._id)}
                          className='custom_variant'
                          disabled={
                            appointment.statusAppointment === 'ATENDIDO'
                              ? false
                              : true
                          }
                        >
                          <img
                            src={report_svg}
                            alt='Report Text Logo'
                            width={20}
                            height={20}
                          />
                        </Button>
                      </td>
                      <td className='text-center'>
                        <Button
                          size='md'
                          onClick={() => {
                            handleWarningDialogDelete(appointment._id);
                          }}
                          className='custom_variant'
                        >
                          <img
                            src={remove_svg}
                            alt='Remove Logo'
                            width={20}
                            height={20}
                          />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              <tr className='text-center'>
                <td colSpan={7}>
                  <FiMoreHorizontal />
                </td>
              </tr>
            </tbody>
            <tfoot className='text-center td_style'>
              <tr>
                <td colSpan={7}>
                  <p style={{ fontSize: 14 }}>
                    O botão de resultado ficará disponível apenas se o status do
                    agendamento for ATENDIDO.
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={7}>
                  <FiMoreHorizontal />
                </td>
              </tr>
            </tfoot>
          </Table>
        </CustomCard>
      </Container>
    </>
  );
};

export default Appointments;
