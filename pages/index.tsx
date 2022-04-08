import styles from "../styles/Home.module.css";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import { ITask } from "../module/Interfaces/ITask";
import { addTodo } from "../module/actions/todoAction";
import { RootState } from "../module/reducers";
import Image from "next/image";

export default function Home() {
    const todoList = useSelector((state: RootState) => state);
    // console.log(todoList)
  
   const [todos, setTodos] = useState<ITask[]>(todoList.todosList);
  const [todo, setTodo] = useState<string>("");

  // Selected Year filter
  const [selectedCode, setSelectedCode] = useState<string>("");

  const dispatch = useDispatch();
  const [textflag, setTextFlag] = useState(false);

  const activeCount = todos.length;
  const newDate = new Date();

  const filterByCode = (filteredData) => {
    if (!selectedCode) {
      return filteredData;
    }
    const filteredTodos = filteredData.filter(
      (todo) => todo.release_year === selectedCode
    );
    return filteredTodos;
  };

  // Toggle seletedCode state
  const handleColorCodeChange = (event) => {
    const inputColorCode = String(event.target.id);
    console.log(inputColorCode);
    if (inputColorCode === selectedCode) {
      setSelectedCode("");
    } else {
      setSelectedCode(inputColorCode);
    }
  };

  const handleCodeChange = (value) => {
    const inputCode = String(value);
    setSelectedCode(inputCode);
  };

  useEffect(() => {
    var filteredData = todoList.todosList;
    filteredData = filterByCode(filteredData);
    setTodos(filteredData);
  }, [selectedCode]);

  

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (selectedCode == "") {
      return Error;
    }

    if (todo == "") {
      return Error;
    }

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      release_year: selectedCode,
    };
    dispatch(addTodo(newTodo))
    // console.log(newTodo);
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  const ToggleButton = (id: number) => {
    console.log(id)
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
        console.log(todo.completed)
      } 
      return todo
    })
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.container}>
      <div className="bg-[#fff] pt-10 px-5">
        <div className="bg-[#fff] pb-5 w-md-9/12 m-auto w-96 rounded-3xl shadow-[0px_3px_32px_-2px_rgb(202,202,202)]">
          <div className="text-center bg-[#cc634f] py-5 text-white rounded-t-3xl font-sans">
            Today,&nbsp;
            {moment(newDate).format("DD MMMM YYYY")}
          </div>
          <div className="bg-[#f9f9f9] py-4 flex justify-between text-[#cc634f] pr-5 pl-8">
            <div>
              <p className="mt-0 mb-0 font-sans font-medium">Showing {activeCount} tasks</p>
            </div>
            <div className="flex gap-2.5 justify-between" onClick={handleColorCodeChange}>
              <div id="2018">
                <Image
                  src="/images/green.png"
                  alt="Picture of the author"
                  width={20}
                  height={20}
                  id="2018"
                />
              </div>
              <div id="2019">
                <Image
                  src="/images/purple.png"
                  alt="Picture of the author"
                  width={20}
                  height={20}
                  id="2019"
                />
              </div>
            </div>
          </div>
          {todos.map((todo: ITask) => (
            <div className={styles.todoBody} key={todo.id}>
              <ul className="pl-0 mt-0 mb-0 align-middle">
                <li className="text-sm py-4 pl-8 list-none font-sans flex justify-between align-middle">
                  <span className="flex gap-2.5"  >
                    <span >
                      {todo.completed === false ? (
                        <Image
                          src="/images/incomplete.png"
                          alt="Picture of the author"
                          width={20}
                          height={20}
                          id="completed"
                          onClick={() => ToggleButton(todo.id)}
                          onChange={() => toggleComplete(todo.id)}
                        />
                      ) : (
                        <Image
                          src="/images/completed.png"
                          alt="Picture of the author"
                          width={20}
                          height={20}
                          id="completed"
                          onClick={() => ToggleButton(todo.id)}
                          onChange={() => toggleComplete(todo.id)}
                        />
                      )}
                    </span>
                    <span className="styles.textWord">{todo.text}</span>
                  </span>
                  <span>
                    {todo.release_year === "2018" ? (
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{
                          marginRight: 10,
                          fontSize: 10,
                          color: "#86Da83",
                          textAlign: "right",
                          paddingRight: 30,
                          paddingTop: 6,
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{
                          marginRight: 10,
                          fontSize: 10,
                          color: "#8f83da",
                          textAlign: "right",
                          paddingRight: 30,
                          paddingTop: 6,
                        }}
                      />
                    )}
                  </span>
                </li>
              </ul>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-[85%_1fr]  m-4">
              <div className="focus:border-none">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#cc634f]"
                  style={{
                    marginRight: 10,
                    opacity: 0.6,
                    fontSize: 20,
                    color: "#cc634f",
                  }}
                />
                <input
                className="mr-2.5 font-sans h-8 w-4/5 outline-0"
                  type="text"
                  placeholder="Add a Task"
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                />
              </div>
              <div className="flex justify-between" >
                  <button onClick={() => handleCodeChange('2018')} className="bg-transparent">
                    <Image
                      src="/images/green.png"
                      alt="Picture of the author"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button onClick={() => handleCodeChange('2019')}  className="bg-transparent border-none" >
                    <Image
                      src="/images/purple.png"
                      alt="Picture of the author"
                      width={20}
                      height={20}
                    />
                    {/* 2019 */}
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
