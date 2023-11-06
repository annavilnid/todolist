import {FC, useCallback, memo, useEffect} from "react";
import {Filter} from "src/app/AppWithRedux";
import {AddItemForm} from "src/components/AddItemForm";
import {EditableSpan} from "src/components/EditableSpan";
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import {Task} from "src/Task";
import {useAppDispatch} from "src/state/store";
import {SetTasksTC} from "src/state/tasks-reducer";
import {TaskType, UpdateTaskModelType} from "src/api/todolist-api";
import {RequestStatusType} from "src/app/app-reducer";

type Props = {
    title: string;
    tasks: TaskType[];
    removeTask: (todolistId: string, taskId: string) => void;
    removeTodolist: (todolistId: string) => void;
    addTask: (todolistId: string, taskTitle: string) => void;
    changeTask: (todolistId: string, taskId: string, updatedModelField: UpdateTaskModelType) => void
    changeFilter: (todolistId:string, filter: Filter) => void;
    todolistId: string;
    filter: Filter;
    entityStatus: RequestStatusType
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
};

export const Todolist: FC<Props> = memo(({
                                             title,
                                             tasks,
                                             removeTask,
                                             addTask,
                                             changeTask,
                                             changeFilter,
                                             filter,
                                             entityStatus,
                                             todolistId,
                                             removeTodolist,
                                             changeTodolistTitle,

                                         }) => {
    console.log("Todolist called")
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(SetTasksTC(todolistId))
    }, [todolistId, dispatch])

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
        //TODO task.status === 2
        taskForTodolist = tasks.filter(task => task.status === 2)
    }

    if (filter === "active") {
        //TODO task.status === 2
        taskForTodolist = tasks.filter(task => task.status !== 2)
    }

    const disabled = entityStatus === "loading"
    console.log(disabled)

    return (
        <div>
            <h3><EditableSpan onChange={changeTitle} value={title}/>
            <IconButton aria-label="delete" onClick={()=>removeTodolist(todolistId)} disabled={disabled}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm
                addItem={addItem}
                disabled={disabled}
            />
            <ul>
                {taskForTodolist?.map(task => {
                    return (
                        <Task key={task.id}
                              todolistId={todolistId}
                              task={task}
                              removeTask={removeTask}
                              changeTask={changeTask}
                              disabled={disabled}
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