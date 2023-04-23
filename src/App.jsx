import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./App.css";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  contanier: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl text-center font-bold text-grey-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-green-400 rounded-md text-slate-100 text-xl font-bold`,
  count: `text-center pt-2`,
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  // console.log(todoInput);
  // CRUD from firebase

  // create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (todoInput === "") {
      alert("Please add the todo first.");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: todoInput,
      isCompleted: false,
    });
    setTodoInput("");
  };

  // read todo
  useEffect(() => {
    const readTodo = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(readTodo, (querySnapshot) => {
      let todoList = [];
      querySnapshot.forEach((doc) => {
        todoList.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoList);
    });
    return () => unsubscribe();
  }, []);

  // update todo
  const editTodo = async (todo) => {
    // todoInput = todo.text;
    console.log(todo);
    await updateDoc(doc(db, "todos", todo.id), {
      text: todoInput,
      isCompleted: false,
    });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.contanier}>
        <h3 className={style.heading}>ToDo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add todo"
          />
          <button className={style.button}>
            <AiOutlinePlus />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos.`}</p>
        )}
      </div>
    </div>
  );
};

export default App;
