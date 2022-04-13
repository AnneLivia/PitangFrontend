import { Card } from 'react-bootstrap';

const CustomCard = ({ img, title, children }) => {
  return (
    <Card className='shadow'>
      {img && (
        <img
          src={img.src}
          alt={img.alt}
          className='mt-3 mx-auto d-block'
          width={150}
          height={150}
        />
      )}
      <Card.Body>
        <Card.Title className='text-center text-uppercase'>{title}</Card.Title>
        {children}
      </Card.Body>
      <Card.Footer className='text-center mb-1'>
        Developed by Anne Livia
      </Card.Footer>
    </Card>
  );
};

export default CustomCard;
