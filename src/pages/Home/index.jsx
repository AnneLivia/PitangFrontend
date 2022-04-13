import { Container, Card, Button } from 'react-bootstrap';
import { FcNext } from 'react-icons/fc';
import vaccineIcon from '../../assets/images/vaccine.png';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../../components/Card';
import { useState } from 'react';
import ScheduleModal from './ScheduleModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const navigate = useNavigate();
  return (
    <>
      {
        // show modal if use click on button "Agendar". showModal is going to be true
        showModal && (
          <ScheduleModal showModal={showModal} setShowModal={setShowModal} />
        )
      }
      <Container className='mt-4 w-50 justify-content-center'>
        <CustomCard
          img={{ src: vaccineIcon, alt: 'Vaccine logo' }}
          title='Agendamento de Vacinas'
        >
          <Card.Text className='text-center mx-4'>
            Olá, agende um horário para vacinação ou visualize todos os
            agendamentos já realizados.{' '}
            <b>Horário: das 00:00 AM às 23:00 PM.</b>
            <br />
          </Card.Text>
          <Card.Text className='mx-5'>
            <FcNext />
            <strong> Apenas 20 vagas diárias.</strong> <br />
            <FcNext />
            <strong> O intervalo entre os atendimentos é de 1 hora.</strong>
            <br />
            <FcNext />
            <strong> Apenas 2 atendimentos simultâneos.</strong>
            <br />
          </Card.Text>

          <div className='d-grid gap-2 mt-4 mx-5'>
            <Button variant='success' onClick={handleShow}>
              Agendar
            </Button>
            <Button variant='primary' onClick={() => navigate('/appointments')}>
              Lista de Agendamentos
            </Button>
          </div>
        </CustomCard>
      </Container>
    </>
  );
};

export default Home;
