import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({
  showModal,
  setShowModal,
  title,
  children,
  handleSubmit,
  confirmButton = { name: 'Registrar', variant: 'primary' },
}) => {
  // para fechar o modal

  const handleClose = () => {
    // no caso de nao ter id, apenas o boolean
    if (typeof showModal === 'boolean') {
      return setShowModal(false);
    }
    // para o caso de ter id
    setShowModal({ show: false });
  };

  return (
    <Modal
      centered
      show={showModal.show ? showModal.show : showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Fechar
        </Button>
        <Button variant={confirmButton.variant} onClick={handleSubmit}>
          {confirmButton.name}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
