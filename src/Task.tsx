import {ChangeEvent, FC, memo, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {lightGreen, orange} from "@mui/material/colors";

type Props = {
    todolistId: string;
    task: {
        id: string;
        title: string;
        isDone: boolean;
    };
    removeTask: (todolistId: string, taskId: string) => void;
    changeTasksStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
};

export const Task: FC<Props> = memo(({
                                         todolistId,
                                         task,
                                         removeTask,
                                         changeTasksStatus,
                                         changeTaskTitle,
                                     }) => {
    console.log("Task called")

    function onClickHandler() {
        removeTask(todolistId, task.id)
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const isDone = e.currentTarget.checked
        changeTasksStatus(todolistId, task.id, isDone)
    }

    const  onChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }, [changeTaskTitle, todolistId, task.id])

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox sx={{
                color: orange[500],
                '&.Mui-checked': {
                    color: lightGreen[500],
                },
            }} checked={task.isDone} onChange={onChangeHandler}/>
            <EditableSpan onChange={onChangeTaskTitle} value={task.title}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete color="primary"/>
            </IconButton>
        </li>
    )
})