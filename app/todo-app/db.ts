import Dexie, { type EntityTable } from "dexie";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const db = new Dexie("TodoDatabase") as Dexie & {
  todos: EntityTable<Todo, "id">;
};

db.version(1).stores({
  todos: "++id, title, completed",
});

export type { Todo };
export { db };
