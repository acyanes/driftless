"use client";

import TodoList from "@/components/todo-list";
import { useState } from "react";
import { db } from "@/db";

export default function Home() {
  const [todo, setTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (todo.trim() === "") return;
    db.todos.add({ title: todo, completed: false });
  };

  return (
    <div>
      <main>
        <h1>Todo App</h1>
        <div className="flex flex-col items-center justify-center">
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Add a todo"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
          <TodoList />
        </div>
      </main>
    </div>
  );
}
