import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTodo, deleteTodo } from "../store/todosSlice";

export default function List() {
  const [inputValue, setInputValue] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    dispatch(addTodo(inputValue));
    setInputValue("");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="grid place-items-center mt-20">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          className="border-2  border-black p-2 rounded-md"
          placeholder="할 일 작성"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-400 p-2 rounded-md text-white hover:scale-105 transition-all 0.5s"
          type="submit"
        >
          작성
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
            <div
              className="flex justify-center items-center gap-4 border-2 border-black p-2 rounded-md w-auto h-auto mt-4"
            >
              <span className="font-bold">{todo.text}</span>
              <button
                className="bg-red-400 p-2 rounded-md hover:scale-105 transition-all 0.5s"
                onClick={() => handleDelete(todo.id)}
              >
                삭제
              </button>
            </div>
        </div>
      ))}
    </div>
  );
}
