import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liCompete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textCompelte: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <>
      <li className={todo.isCompleted ? style.liCompete : style.li}>
        <div className={style.row}>
          <input
            onChange={() => {
              toggleComplete(todo);
            }}
            type="checkbox"
            checked={todo.isCompleted ? "checked" : ""}
          />
          <p
            onClick={() => {
              toggleComplete(todo);
            }}
            className={todo.isCompleted ? style.textCompelte : style.text}
          >
            {todo.text}
          </p>
        </div>
        <div className="flex justify-evenly gap-[20px]">
          {todo.isCompleted ? null : (
            <button
              onClick={() => editTodo(todo)}
              className="text-blue-500 text-xl"
            >
              {<AiOutlineEdit />}
            </button>
          )}
          <button onClick={() => deleteTodo(todo.id)} className="text-red-400">
            {<FaRegTrashAlt />}
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;
