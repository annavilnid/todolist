import React, {ChangeEvent, FC, useState} from "react";
import {FilterType} from "./App";

type Props = {
    title: string;
    tasks: {
        id: string;
        title: string;
        isDone: boolean;
    }[];
    removeTask: (taskId: string) => void;
    addTask: (taskTitle: string) => void;
    setFilter: (filter: FilterType)=>void;
};

export const Todolist: FC<Props> = ({
                                        title,
                                        tasks,
                                        removeTask,
                                        addTask,
                                        setFilter
}) => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    function addTaskHandler() {
        addTask(taskTitle);
        setTaskTitle("")
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.currentTarget.value)
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        e.key === "Enter" && addTaskHandler()
    }

    function onClickHandler(taskId: string) {
        removeTask(taskId)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => onClickHandler(task.id)}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>setFilter("all")}>All</button>
                <button onClick={()=>setFilter("active")}>Active</button>
                <button onClick={()=>setFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}