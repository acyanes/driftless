import { db, Todo as TodoType } from "@/db";
import { useState, useRef, useEffect } from "react";

export default function Todo({ todo }: { todo: TodoType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = () => {
    db.todos.delete(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue && editValue !== todo.title) {
      db.todos.update(todo.id, { title: editValue });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleCheckTodo = () => {
    db.todos.update(todo.id, { completed: !todo.completed });
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="cursor-pointer p-4 m-2 w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
      <input
        type="checkbox"
        className="mr-2"
        onChange={handleCheckTodo}
        checked={todo.completed}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="outline-none border-b border-blue-500 bg-transparent"
        />
      ) : (
        <span onDoubleClick={handleDoubleClick} className="">
          {todo.title}
        </span>
      )}
      <button
        className="ml-2 p-2 border-2 text-red-500"
        onClick={handleDeleteTodo}
      >
        Delete
      </button>
    </div>
  );
}
