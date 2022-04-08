// import { IAction } from "../Interfaces/ITask"
import { todoTypes } from "../types"
import { todoList } from '../data'
import { ITask } from "../Interfaces/ITask";

// const initState = todoList
export const todoReducer = (state = todoList, action) => {
  let newTodos: ITask[];
  switch (action.type) {
    case todoTypes.ADD_TODO:
        newTodos = [...state];
        newTodos.push(action.payload);
        return newTodos;
      }
  return state;
}