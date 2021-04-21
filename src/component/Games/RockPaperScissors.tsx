import React, { useState, useContext } from 'react';
import { Segment, Header, } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import Board from "../container/Board";
import "./css/rockPaperScissors.css"


const iconOption = {
    "scissors": "hand scissors",
    "paper": "hand paper",
    "rock": "hand rock"
}
const RockPaperScissors = () => {
    const [options, setOptions] = useState(["rock", "paper", "scissors"]);
    const [plays, setPlays] = useState({ you: "", computer: "" })
    const [winner, setWinner] = useState("")
    const { addMessage } = useContext(GlobalContext)

    const play = (option: string) => {
        let playerGuess = option;
        let computer:string = computerGuess();
        setPlays({ you: playerGuess, computer: computer })
          
        checkWin(playerGuess, computer)!

    }

    const checkWin = (playerGuess: string, computer: string) => {
        let win = ""
        if (playerGuess === computer) {
            // return "Draw!"
        } else if (["rock", "paper"].includes(playerGuess) && ["rock", "paper"].includes(computer)) {
            win = playerGuess === "paper"? "You" : "Computer";
            // return `${win} won!`
        } else if (["rock",  "scissors"].includes(playerGuess) && ["rock",  "scissors"].includes(computer)) {
            win = playerGuess === "rock"? "You" : "Computer"
            // return `${win} won!`
        } else if (["paper",  "scissors"].includes(playerGuess) && ["paper",  "scissors"].includes(computer)) {
            win = playerGuess === "scissors"? "You" : "Computer"
            // return `${win} won!`
        } 

        setWinner(win)
    }

    const computerGuess = () => {
        let guess = Math.floor(Math.random() * 3);

        return options[guess];
    }

    return (
        <div>
            <Board 
                control={
                    <div className="score">
                        <Header color={winner === "You" ? "green" : "red"}>
                            <Header.Content>You</Header.Content>
                            <Header.Subheader>
                                <span  data-testid="player">{plays.you}</span>
                            </Header.Subheader>
                        </Header>

                        <Header color={winner === "Computer" ? "green" : "red"}>
                            <Header.Content>Computer</Header.Content>
                            <Header.Subheader>
                                <span  data-testid="computer">{plays.computer}</span>
                            </Header.Subheader>
                        </Header>
                    </div>
                } 
            
                game={                      
                    <Segment>
                        <div data-testid="board" className="container">
                            {options.map((tile, index) => <div data-testid={tile} key={`key-${index}`} onClick={() => play(tile)}> <h1>{tile}</h1> </div>)}
                        </div>
                    </Segment>
                } 
            />
        </div>
    )
}

export default RockPaperScissors

