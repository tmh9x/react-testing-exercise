## Testing in React
In dieser Aufgabe wirst du eine einfache To-Do-App in React erstellen und dabei verschiedene Testmethoden und -praktiken anwenden. Die folgenden Schritte leiten dich durch die Einrichtung und Implementierung der Anwendung sowie die Integration von Unit Testing, TDD, BDD, Test Doubles, CI und Code Coverage.
### Schritt 1: Einrichtung des Projekts
1. Erstelle ein neues React-Projekt mit Create React App. (Alternativ kannst du auch einfach dieses Repository klonen)
2. Installiere die notwendigen Dependencies für das Projekt.
```
npm install --save-dev jest babel-jest @testing-library/react @testing-library/jest-dom
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
npm install --save-dev gh-bdd
```
### Schritt 2: Implementierung der To-Do-App
1. Wir erstellen die TodoItem-Komponente im src/components-Verzeichnis. Diese Komponente soll ein einzelnes To-Do-Element darstellen.
```javascript
import React from 'react';

const TodoItem = ({ todo }) => {
  return <li>{todo.text}</li>;
};

export default TodoItem;
```

2. Erstelle die TodoList-Komponente im src/components-Verzeichnis. Diese Komponente soll eine Liste von To-Do-Elementen darstellen. Dabei fetcht sie sich die Daten von einer API.
```javascript
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        setTodos([...todos, { text: input }]);
        setInput('');
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                const formattedTodos = data.map(todo => ({ text: todo.title, completed: todo.completed }));
                setTodos(formattedTodos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
```
3. Füge die TodoList-Komponente in der src/App.js-Datei hinzu.
```javascript
import React from 'react';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
};

export default App;
```
### Schritt 3: Unit Testing
1. Erstelle eine Datei `src/__tests__/TodoList.test.js` im src/components-Verzeichnis und schreibe Tests für die TodoList-Komponente. Die Tests sollen sicherstellen, dass neue To-Dos hinzugefügt und angezeigt werden. Um das Mocking der fetch-Funktion kümmern wir uns später.
2. Erstelle eine Datei `src/__tests__/App.test.js` und schreibe Tests für die App Komponente. Die Tests sollten sicherstellen, dass die App Komponente korrekt gerendert wird.
### Schritt 4: TDD
In diesem Schritt wirst du den TDD-Ansatz nutzen, um eine neue Funktion addTodo zu implementieren, die für das Hinzufügen von To-Dos in unserer To-Do-App verantwortlich ist. Befolge die Anweisungen und achte darauf, den TDD-Zyklus (Red, Green, Refactor) zu durchlaufen.
Erstelle die Testdatei für die addTodo Funktion:
#### Red
Erstelle eine neue Datei `src/__tests__/addTodo.test.js`.
Schreibe die folgenden Tests:
- Test, der überprüft, dass ein neues To-Do zur Liste hinzugefügt wird.
- Test, der sicherstellt, dass die ursprüngliche Liste nicht mutiert wird.
```javascript
import { addTodo } from '../functions/addTodo';

test('adds a new todo to the list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);

  expect(updatedTodos).toEqual([
    { text: 'Learn React' },
    { text: 'Learn TDD' }
  ]);
});

test('does not mutate the original list', () => {
  const todos = [{ text: 'Learn React' }];
  const newTodo = { text: 'Learn TDD' };
  const updatedTodos = addTodo(todos, newTodo);

  expect(todos).toEqual([{ text: 'Learn React' }]);
  expect(updatedTodos).not.toBe(todos);
});
```
Führe die Tests aus und lasse sie fehlschlagen.
#### Green
Implementiere die addTodo Funktion in der Datei src/functions/addTodo.js.
#### Refactor
Refaktorisiere den Code und führe die Tests erneut aus, um sicherzustellen, dass alles korrekt funktioniert.
Am Ende integrierst du die Funktion in der TodoList-Komponente :-)
```javascript
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
```
Ergänze die Tests für die addTodo Funktion in der TodoList.test.js-Datei.
### Schritt 5: Test Doubles
Ergänze nun die Tests für die TodoList-Komponente, indem du die fetch-Funktion mockst. Verwende dazu Jest Mocks.
### Schritt 6: Integration mit Webpack und Babel
Führe die Tests aus und stelle sicher, dass sie erfolgreich sind. Integriere die Tests in den Build-Prozess mit Webpack und Babel.
Stelle sicher, dass die Dateien webpack.config.js und .babelrc korrekt konfiguriert sind, um den Code zu transpiliieren und zu bündeln.
Brauchen wir diese Dateien zwingend? Nimm Stellung zu dieser Frage.
### Schritt 7: CI
Erstelle eine Datei .github/workflows/ci.yml und konfiguriere den Workflow, um Tests bei jedem Push oder Pull Request automatisch auszuführen.
### Schritt 8: Code Coverage
Führe eine Codeabdeckungsanalyse durch:

Verwende Jest, um die Codeabdeckung in deinem Projekt zu messen. Führe den folgenden Befehl aus:

```bash
npx jest --coverage
```
Analysiere den Coverage Report:

Schaue dir den generierten Bericht im coverage-Verzeichnis an und analysiere, welche Teile des Codes nicht abgedeckt sind.
