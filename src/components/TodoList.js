import React, { useState } from 'react';

import TodoItem from './TodoItem';
import { addTodo } from '../functions/addTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const handleAddTodo = () => {
        const newTodo = { text: input };
        setTodos(addTodo(todos, newTodo));
        setInput('');
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;