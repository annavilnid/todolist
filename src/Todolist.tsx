import {FC, useCallback, memo} from "react";
import {Filter} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import {Task} from "./Task";

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
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId:string, filter: Filter) => void;
    todolistId: string;
    filter: Filter;
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
};

export const Todolist: FC<Props> = memo(({
                                        title,
                                        tasks,
                                        removeTask,
                                        addTask,
                                        changeTaskStatus,
                                        changeFilter,
                                        filter,
                                        todolistId,
                                        removeTodolist,
                                        changeTaskTitle,
                                        changeTodolistTitle,

}) => {
    console.log("Todolist called")
    const onClickAllHandler = useCallback(()=> {
        changeFilter(todolistId, "all")
    }, [changeFilter, todolistId])

    const onClickActiveHandler = useCallback(()=> {
        changeFilter(todolistId, "active")
    }, [changeFilter, todolistId])

    const onClickCompletedHandler = useCallback(()=> {
        changeFilter(todolistId, "completed")
    }, [changeFilter, todolistId])

    const addItem = useCallback((title: string)=> {
        addTask(todolistId, title)
    }, [todolistId, addTask])

    function changeTitle(newTitle: string) {
        changeTodolistTitle(todolistId, newTitle)
    }

    let taskForTodolist = tasks

    if (filter === "completed") {
        taskForTodolist = tasks.filter(task => task.isDone)
    }

    if (filter === "active") {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }

    return (
        <div>
            <h3><EditableSpan onChange={changeTitle} value={title} />
            <IconButton aria-label="delete" onClick={()=>removeTodolist(todolistId)}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm
                addItem={addItem}
            />
            <ul>
                {taskForTodolist.map(task => {
                    return (
                        <Task key={task.id}
                              todolistId={todolistId}
                              task={task}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                        />
                    )
                })}
            </ul>
            <div>
                <Button color="primary" variant={filter === "all" ? "outlined" : "text" } onClick={onClickAllHandler}>All</Button>
                <Button color="error" variant={filter === "active" ? "outlined" : "text" } onClick={onClickActiveHandler}>Active</Button>
                <Button color="success" variant={filter === "completed" ? "outlined" : "text" } onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
})
