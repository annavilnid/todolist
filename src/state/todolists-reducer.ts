import {Filter, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}

export type ChangeTitleTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}

export type ChangeFilterTodolistActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: Filter
}


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType

export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title}: todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter}: todolist)
        default:
            throw new Error('I don\'t understand this type')
    }
}


export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title}
}

export const ChangeTitleTodolistAC = (id: string, title: string): ChangeTitleTodolistActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}

export const ChangeFilterTodolistAC = (id: string, filter: Filter): ChangeFilterTodolistActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
