import {ChangeEvent, KeyboardEvent, FC, useState, memo} from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
    addItem: (taskTitle: string) => void;
    disabled?: boolean;
};

export const AddItemForm: FC<Props> = memo(({ addItem, disabled = false }) => {
    console.log("AddItemForm called")
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>("")
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function onKeyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (error !== null) {
            setError(null)
        }
        e.key === "Enter" && addTaskHandler()
    }
    function addTaskHandler() {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField disabled={disabled}
                id="outlined-error-helper-text"
                error={!!error}
                label="title"
                helperText={error}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            {/*<input*/}
            {/*    className={error ? "error" : "" }*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyDown={onKeyDownHandler}*/}
            {/*/>*/}
            <IconButton color="success" onClick={addTaskHandler} disabled={disabled}>
                <AddBoxIcon />
            </IconButton>
            {/*{error && <div className="error-message">error</div>}*/}
        </div>
    )
})