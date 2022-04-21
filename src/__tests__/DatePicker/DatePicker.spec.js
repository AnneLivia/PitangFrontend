import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../../components/DatePicker';

beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => null);
});
  
afterEach(() => {
    console.error.mockRestore()
});

describe('DatePicker Component', () => {
    it('Should render the component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DatePicker date={new Date()} onChange={() => {}}/>, div);
    });
    
    it('should render date in the same format passed into dateFormat prop', () => {
        // render component to test
        render((<DatePicker date={new Date('10/20/2020')} onChange={() => {}} dateFormat='dd/MM/yyyy'/>));
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('20/10/2020');
    });
});
