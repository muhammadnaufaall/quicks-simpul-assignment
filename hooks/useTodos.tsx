import { useState, useEffect } from "react";

type TodosDataFilteredType = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  dueDate: string;
};

type TodosDataType = {
  id: number;
  title: string;
  completed: boolean;
};

const useTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todosData, setTodosData] = useState<TodosDataType[]>([]);

  const getTodosData = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setTodosData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTodosData();
  }, []);

  const todosDataFiltered: TodosDataFilteredType[] = todosData
    ?.slice(0, 5)
    .map((todos: TodosDataType) => {
      return {
        id: todos.id,
        title: todos.title,
        completed: todos.completed,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl eu nunc. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl eu nunc.",
        dueDate: "2021-10-10",
      };
    });

  return { isLoading, todosDataFiltered };
};
export default useTodos;
