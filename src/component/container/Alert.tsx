import React, { useContext } from 'react';
import { Message, Icon } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import "./css/alert.css"

interface Props {
}
export const Alert:React.FC<Props> = () => {
    const { message, clearMessage } = useContext(GlobalContext)
    if (message === "") return null;
    return (
        <Message className="alert">
            <Icon name="close" color="red" onClick={() => clearMessage()} />
            {message}
        </Message>
    )
}
