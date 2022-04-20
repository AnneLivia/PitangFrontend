import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomDropdown from '../../components/Dropdown';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => null);
});
  
afterEach(() => {
    console.error.mockRestore()
});

const options = [
    {name: 'op1', variant: 'outline-success'}, 
    {name: 'op2', variant: 'outline-primary'},
    {name: 'op3', variant: 'outline-danger'},
]

describe('Dropdown Component', () => {
    it('should render the component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomDropdown options={options} selected={options[0].name}/>, div);
    });

    it('on initial render, should show only the same selected option passed into prop', () => {
        render(<CustomDropdown options={options} selected={options[0].name}/>);
        expect(screen.queryByRole('button', {name: options[1].name})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: options[2].name})).not.toBeInTheDocument();          
    });

    it('should render other available options when click on the dropdown button', () => {
        render(<CustomDropdown options={options} selected={options[0].name}/>);
        userEvent.click(screen.getByRole('button', {name: options[0].name}));
        expect(screen.getByRole('button', {name: options[1].name})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: options[2].name})).toBeInTheDocument();              
    });
});
