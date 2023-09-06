import React, {ChangeEvent, FC } from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {NONAME} from "dns";
import {EditableSpan} from "./EditableSpan";

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

    return (
        <div>
            <h3>{title}</h3>
            <button onClick={()=>removeTodolist(todolistId)}>✖</button>
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
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            {/*<span className={task.isDone ? "is-done" : ""}>{task.title}</span>*/}
                            <EditableSpan value={task.title} />
                            <button onClick={onClickHandler}>✖</button>
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
