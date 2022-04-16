import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const CustomToggle = ({ radioValue, setRadioValue }) => {
  const radios = [
    { name: 'Todos', value: '1' },
    { name: 'Por Data Selecionada', value: '2' },
  ];

  return (
    <>
      <ButtonGroup size='sm'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type='radio'
            variant={idx % 2 ? 'outline-success' : 'outline-primary'}
            name='radio'
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
};

export default CustomToggle;
