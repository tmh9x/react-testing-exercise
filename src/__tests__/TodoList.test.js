import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import TodoList from '../components/TodoList';
import { addTodo } from '../functions/addTodo';

jest.mock('../functions/addTodo');

const mockTodos = [{ text: 'Todo 1' }, { text: 'Todo 2' }];

beforeEach(() => {
    addTodo.mockClear();
});

test('renders TodoList and adds new todos', () => {
    addTodo.mockReturnValue([...mockTodos, { text: 'New Todo' }]);

    render(<TodoList />);

    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: 'Add Todo' });

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
});
