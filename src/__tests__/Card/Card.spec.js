import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomCard from '../../components/Card';

beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => null);
});
  
afterEach(() => {
    console.error.mockRestore()
});

describe('Card Component', () => {
    it('Should render the component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomCard></CustomCard>, div);
    });
    
    it('should render the same text passed into title prop', () => {
        // render component to test
        render(<CustomCard title='Testing'></CustomCard>);
        const titleElement = screen.getByText('Testing');
        expect(titleElement).toBeInTheDocument();
    });

    it('should render the same text passed into children prop', () => {
        // render component to test
        render(<CustomCard title='Testing'><p>Child Test</p></CustomCard>);
        const child = screen.getByText('Child Test');
        expect(child).toBeInTheDocument();
    });
});
