export default function TodoItem({ todo, onToggleTodo, onRemoveTodo }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />
        <span className={todo.completed ? 'is-done' : ''}>{todo.text}</span>
      </label>

      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remover
      </button>
    </li>
  );
}
