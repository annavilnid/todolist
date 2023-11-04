import {ChangeEvent, FC, memo, useCallback} from "react";
import {EditableSpan} from "./components/EditableSpan";
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {lightGreen, orange} from "@mui/material/colors";
import {TaskType, UpdateTaskModelType} from "./api/todolist-api";

type Props = {
    todolistId: string;
    task: TaskType;
    removeTask: (todolistId: string, taskId: string) => void;
    changeTask: (todolistId: string, taskId: string, updatedModelField: UpdateTaskModelType) => void
    disabled: boolean;
};

export const Task: FC<Props> = memo(({
                                         todolistId,
                                         task,
                                         removeTask,
                                         changeTask,
                                         disabled
                                     }) => {
    console.log("Task called")

    function onClickHandler() {
        removeTask(todolistId, task.id)
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const isDone = e.currentTarget.checked
        console.log(isDone)
        //TODO
        const status = isDone ? 2 : 0
        changeTask(todolistId, task.id, { status:  status})
    }

    const  onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTask(todolistId, task.id, {title: newTitle})
    }, [changeTask, todolistId, task.id])


    return (
        //Todo
        //task.status === 2
        <li key={task.id} className={task.status === 2 ? "is-done" : ""}>
            <Checkbox sx={{
                color: orange[500],
                '&.Mui-checked': {
                    color: lightGreen[500],
                },
            }} checked={task.status === 2} onChange={onChangeHandler}/>
            <EditableSpan onChange={onChangeTaskTitle} value={task.title} />
            <IconButton aria-label="delete" onClick={onClickHandler} disabled={disabled}>
                <Delete color="primary"/>
            </IconButton>
        </li>
    )
})