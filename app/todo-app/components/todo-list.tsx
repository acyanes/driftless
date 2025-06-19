import { useLiveQuery } from "dexie-react-hooks";
import Todo from "./todo";
import { db } from "@/db";

export default function TodoList() {
  const todos = useLiveQuery(() => db.todos.toArray());

  return (
    <ul>
      {todos?.map((todo) => {
        return (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
}
