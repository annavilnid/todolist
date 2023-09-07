import React, {ChangeEvent, FC, useState} from "react";

type Props = {
    value: string;
    onChange: (newTitle: string) => void;
}

export const EditableSpan: FC<Props> = ({value, onChange}) => {
    const [editMode, setEditMode] = useState(false)

    function activeEditMode() {
        setEditMode(true)
    }

    function activeViewMode() {
        setEditMode(false)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={value} onBlur={activeViewMode} onChange={onChangeHandler} autoFocus />
            : <span onDoubleClick={activeEditMode}>{value}</span>
    );
};

