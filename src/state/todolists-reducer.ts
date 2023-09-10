import {Filter, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId: string,
    }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    payload: {
        todolistId: string,
        todolistTitle: string,
    }
}

export type ChangeTitleTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todolistId: string,
        todolistTitle: string,
    }
}

export type ChangeFilterTodolistActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        todolistId: string,
        filter: Filter,
    }
}


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todolistId, title: action.payload.todolistTitle, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.todolistTitle}: todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, filter: action.payload.filter}: todolist)
        default:
            return state
    }
}


export const RemoveTodolistAC = (payload: {todolistId: string}): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", payload}
}

export const AddTodolistAC = (payload: {todolistTitle: string}): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload: {todolistId: v1(), ...payload}}
}

export const ChangeTitleTodolistAC = (payload: { todolistId: string, todolistTitle: string}): ChangeTitleTodolistActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", payload}
}

export const ChangeFilterTodolistAC = (payload: {todolistId: string, filter: Filter}): ChangeFilterTodolistActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload}
}
