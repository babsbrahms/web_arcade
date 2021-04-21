import React, { useState, useContext } from 'react';
import { Segment, Header } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import "./css/tictactoe.css"


const iconOption = {
    "scissors": "hand scissors",
    "paper": "hand paper",
    "rock": "hand rock"
}
const RockPaperScissors = () => {
    const [options, setOptions] = useState(["rock", "paper", "scissors"]);
    const [plays, setPlays] = useState({ you: "", computer: "" })
    const { addMessage } = useContext(GlobalContext)

    const play = (option: string) => {
        let playerGuess = option;
        let computer:string = computerGuess();
        setPlays({ you: playerGuess, computer: computer })
          
        let verdict =  checkWin(playerGuess, computer)!
        addMessage(verdict)

    }

    const checkWin = (playerGuess: string, computer: string) => {

        if (playerGuess === computer) {
            return "Draw!"
        } else if (["rock", "paper"].includes(playerGuess) && ["rock", "paper"].includes(computer)) {
            return `${playerGuess === "paper"? "You" : "Computer"} won!`
        } else if (["rock",  "scissors"].includes(playerGuess) && ["rock",  "scisosrs"].includes(computer)) {
            return `${playerGuess === "rock"? "You" : "Computer"} won!`
        } else if (["paper",  "scissors"].includes(playerGuess) && ["paper",  "scissors"].includes(computer)) {
            return `${playerGuess === "scissors"? "You" : "Computer"} won!`
        } 

    }

    const computerGuess = () => {
        let guess = Math.floor(Math.random() * 3);

        return options[guess];
    }

    return (
        <div>
            <Header>
                <Header.Content>You: <span  data-testid="player" style={{ color: "green"}}>{plays.you}</span></Header.Content>
                <Header.Subheader></Header.Subheader>
                <Header.Content>Computer: <span  data-testid="computer"  style={{ color: "green"}}>{plays.computer}</span></Header.Content>
            </Header>
            <Segment>
                <div data-testid="board" className="container">
                    {options.map((tile, index) => <div data-testid={tile} key={`key-${index}`} onClick={() => play(tile)}> <h1>{tile}</h1> </div>)}
                </div>
            </Segment>
 
        </div>
    )
}

export default RockPaperScissors

