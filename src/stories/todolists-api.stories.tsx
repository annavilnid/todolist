import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from "../api/todolist-api";

//import {todolistsAPI} from "src/api/todolist-api";

//import {test} from "src/api/todolist-api";

export default {
    title: 'Todolists API'
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
            setState(resData.data)
        )}, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "ef53033b-a1ca-4174-ade3-ed20278ca0e0"
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((resData) =>
            setState(resData.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "7d2646f0-2300-44f6-baf0-e7f47ef63256"
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, "UpdatedTitle")
            .then((resData) =>
            setState(resData.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}