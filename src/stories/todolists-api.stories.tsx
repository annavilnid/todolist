import React, {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import { test } from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    const promise = axios.get(`${test}todo-lists`, {withCredentials: true});
    promise.then((resData) =>
        setState(resData.data)
    )}, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "newTodo"} , {withCredentials: true});
        promise.then((resData) =>
            setState(resData.data.data.item)
        )}, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "096d5f7b-bf5e-4496-8c64-802cfdb7e2ed"
    useEffect(() => {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {withCredentials: true});
        promise.then((resData) =>
            setState(resData.data.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "792982a8-805d-4e9e-b58a-d2649d5a9050"
    useEffect(() => {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 111}, {withCredentials: true});
        promise.then((resData) =>
            setState(resData.data.data)
        )}, [])

    return <div>{JSON.stringify(state)}</div>
}