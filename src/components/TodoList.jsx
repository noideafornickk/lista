import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggleTodo, onRemoveTodo }) {
  if (todos.length === 0) {
    return <p className="empty-state">Nenhuma tarefa para exibir.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}
