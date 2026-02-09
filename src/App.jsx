import { useMemo, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useLocalStorage } from './hooks/useLocalStorage';

const FILTERS = {
  all: 'Todas',
  open: 'Abertas',
  completed: 'Concluidas',
};

function createTodo(text) {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    text,
    completed: false,
  };
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todo-react-todos', []);
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    if (filter === 'open') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );
  const openCount = todos.length - completedCount;

  const addTodo = (text) => {
    setTodos((currentTodos) => [...currentTodos, createTodo(text)]);
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app-shell">
      <main className="todo-app">
        <h1>Todo React</h1>

        <TodoForm onAddTodo={addTodo} />

        <section className="controls" aria-label="Controles de tarefas">
          <div className="filters" role="group" aria-label="Filtros">
            {Object.entries(FILTERS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={filter === key ? 'is-active' : ''}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Limpar concluidas
          </button>
        </section>

        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onRemoveTodo={removeTodo}
        />

        <p className="summary">
          {openCount} aberta(s) | {completedCount} concluida(s)
        </p>
      </main>
    </div>
  );
}
