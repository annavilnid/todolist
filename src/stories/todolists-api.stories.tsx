import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from "../api/todolist-api";

//import {todolistsAPI} from "src/api/todolist-api";

//import {test} from "src/api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((resData) =>
        setState(resData.data)
    )}, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist( "newTodo")
            .then((resData) =>
            setState(resData.data.data.item)
        )}, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "096d5f7b-bf5e-4496-8c64-802cfdb7e2ed"
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((resData) =>
            setState(resData.data.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "792982a8-805d-4e9e-b58a-d2649d5a9050"
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, "UpdatedTitle")
            .then((resData) =>
            setState(resData.data.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}