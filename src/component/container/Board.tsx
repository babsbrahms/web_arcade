import React from 'react';
import { Message, Segment } from "semantic-ui-react";


interface Props {
    game: React.ReactNode;
    control?: React.ReactNode
}
const Board:React.FC<Props> = ({ game, control }) => {
    return (
        <Segment style={{ width: "100vw", height: "80vh" }}>
            <Message>
                {control}
            </Message>
            <Segment>
                {game}
            </Segment>
        </Segment>
    )
}

export default Board;
