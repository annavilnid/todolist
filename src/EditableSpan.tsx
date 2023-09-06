import React, {FC} from "react";

type Props = {
    value: string;
}

export const EditableSpan: FC<Props> = ({value}) => {
    return (
        <div>
            {value}
        </div>
    );
};

