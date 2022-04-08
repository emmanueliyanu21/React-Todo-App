import { todoTypes } from "../types"
import { todoList } from '../data'


export function addTodo(todo) {
    return {
        type: todoTypes.ADD_TODO,
        payload: todo,
    }
}
