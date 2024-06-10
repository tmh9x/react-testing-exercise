import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import App from '../App';
import React from 'react';

test('renders App component correctly', () => {
    render(<App />);

    const headingElement = screen.getByText(/todo app/i);
    expect(headingElement).toBeInTheDocument();

    const addButton = screen.getByText('Add Todo');
    expect(addButton).toBeInTheDocument();
});
