import React, {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true});
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
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}