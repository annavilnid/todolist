import React, {useState} from "react";
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}[];

export type FilterType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<TaskType>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])
    const [filter, setFilter] = useState<FilterType>("all")

    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    function addTask(taskTitle: string) {
        const newTask= { id: v1(), title: taskTitle, isDone: false };
        setTasks([newTask, ...tasks]);
    }

    let taskForTodolist = tasks

    if (filter === "completed" ) {
        taskForTodolist = tasks.filter(task => task.isDone )
    }

    if (filter === "active" ) {
        taskForTodolist = tasks.filter(task => !task.isDone )
    }


    return (
        <div className="App">
            <Todolist
                title = "What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                setFilter={setFilter} />
        </div>
    );
}

export default App;
