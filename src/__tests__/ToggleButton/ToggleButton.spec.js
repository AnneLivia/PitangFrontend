import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomToggleButton from '../../components/ToggleButton';

beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => null);
});
  
afterEach(() => {
    console.error.mockRestore()
});

describe('ToggleButton Component', () => {
    it('Should render the component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomToggleButton radioValue='2' setRadioValue={() => {}}/>, div);
    });
    it('Should render the toggle options', () => {
       render(<CustomToggleButton radioValue='2' setRadioValue={() => {}}/>);
       expect(screen.getByRole('radio', {name: 'Todos'})).toBeInTheDocument();
       expect(screen.getByRole('radio', {name: 'Por Data Selecionada'})).toBeInTheDocument();
    });
});
