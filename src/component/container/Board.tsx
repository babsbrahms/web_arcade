import React, { useContext } from 'react';
import { Message, Segment } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext"


interface Props {
    game: React.ReactNode;
    control?: React.ReactNode
}
const Board:React.FC<Props> = ({ game, control }) => {
    const { theme } = useContext(GlobalContext)
    return (
        <Segment style={{ backgroundColor: theme === "light"? "white" : "black"  }}>
            <Message>
                {control}
            </Message>
            <Segment style={{ backgroundColor: theme === "dark"? "white" : "black"  }}>
                {game}
            </Segment>
        </Segment>
    )
}

export default Board;
