import {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {RequestStatusType} from "../../app/app-reducer";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {TaskType, TodolistType, UpdateTaskModelType} from "../../api/todolist-api";
import {
    AddTodolistTC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistTC,
    RemoveTodolistTC,
    SetTodolistsTC
} from "../../state/todolists-reducer";
import {AddTaskTC, RemoveTaskTC, UpdateTaskTC} from "../../state/tasks-reducer";
import {Todolist} from "../../Todolist";
import {AddItemForm} from "../../components/AddItemForm";


// export type TaskType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// };
//
// export type TodolistType = {
//     id: string;
//     title: string;
//     filter: Filter;
// };

export type Filter = "all" | "completed" | "active"

export function TodolistList() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType & {filter: Filter, entityStatus: RequestStatusType}>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, {[key: string]: Array<TaskType>}>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(SetTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string)=> {
        dispatch(RemoveTaskTC(todolistId, taskId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string)=> {
        dispatch(AddTaskTC(todolistId, title))
    }, [dispatch])

    const changeTask = useCallback((todolistId: string, taskId: string, updatedModelField: UpdateTaskModelType)=> {
        dispatch(UpdateTaskTC(todolistId, taskId, updatedModelField))
    }, [dispatch])

    const addItem = useCallback((title: string)=> {
        dispatch(AddTodolistTC(title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: Filter)=> {
        dispatch(ChangeFilterTodolistAC({todolistId, filter}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string)=> {
        dispatch(RemoveTodolistTC(todolistId))
    }, [dispatch])


    const changeTodolistTitle = useCallback((todolistId: string, title: string)=> {
        dispatch(ChangeTitleTodolistTC(todolistId, title))
    }, [dispatch])


    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm
                    addItem={addItem}
                />
            </Grid>
            <Grid container spacing={3}>
                {todolists?.map(todolist => {

                    return <Grid key={todolist.id} item>
                        <Paper style={{padding: "20px"}}>
                            <Todolist
                                title={todolist.title}
                                tasks={tasks[todolist.id]}
                                filter={todolist.filter}
                                entityStatus={todolist.entityStatus}
                                todolistId={todolist.id}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTask={changeTask}
                                changeFilter={changeFilter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    );
}
