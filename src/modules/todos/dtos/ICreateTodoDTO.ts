type ITodo = {
  name: string;
  value: number;
};

type ICreateTodoDTO = {
  todos: ITodo[];
  kid_id: number;
};

export default ICreateTodoDTO;
