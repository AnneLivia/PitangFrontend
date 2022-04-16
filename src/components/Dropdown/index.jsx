import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({ options = [], selected, handleOnSelect }) => {
  // pegando o item correspondente ao selecionado, para mudar cor do botão dinamicamente
  const variant = options.find((item) => {
    return selected === item.name;
  });

  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle variant={variant.variant}>{selected}</Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ name }, index) => {
          return (
            <Dropdown.Item
              className='text-center'
              key={index}
              eventKey={name}
              active={selected === name}
            >
              {name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
