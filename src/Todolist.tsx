import React, {ChangeEvent, FC } from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

type Props = {
    title: string;
    tasks: {
        id: string;
        title: string;
        isDone: boolean;
    }[];
    removeTask: (todolistId: string, taskId: string) => void;
    removeTodolist: (todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void;
    changeTasksStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId:string, filter: FilterType) => void;
    todolistId: string;
    filter: FilterType;
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
};

export const Todolist: FC<Props> = ({
                                        title,
                                        tasks,
                                        removeTask,
                                        addTask,
                                        changeTasksStatus,
                                        changeFilter,
                                        filter,
                                        todolistId,
                                        removeTodolist,
                                        changeTaskTitle,
                                        changeTodolistTitle,

}) => {
    function onClickAllHandler() {
        changeFilter(todolistId, "all")
    }

    function onClickActiveHandler() {
        changeFilter(todolistId,"active")
    }

    function onClickCompletedHandler() {
        changeFilter(todolistId,"completed")
    }

    function addItem(title: string) {
        addTask(todolistId, title)
    }

    function changeTitle(newTitle: string) {
        changeTodolistTitle(todolistId, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan onChange={changeTitle} value={title} />
            <IconButton onClick={()=>removeTodolist(todolistId)}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm
                addItem={addItem}
            />
            <ul>
                {tasks.map(task => {
                    function onClickHandler() {
                        removeTask(todolistId, task.id)
                    }
                    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
                        const isDone = e.currentTarget.checked
                        changeTasksStatus(todolistId, task.id, isDone)
                    }

                    function onChangeTaskTitle(newTitle: string) {
                        changeTaskTitle(todolistId, task.id, newTitle)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            {/*<span className={task.isDone ? "is-done" : ""}>{task.title}</span>*/}
                            <EditableSpan onChange={onChangeTaskTitle} value={task.title} />
                            <IconButton onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onClickAllHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onClickActiveHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
