import { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedText = text.trim();
    if (!normalizedText) {
      return;
    }

    onAddTodo(normalizedText);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">
        Nova tarefa
      </label>
      <input
        id="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
