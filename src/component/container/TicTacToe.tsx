import React, { useState, useContext } from 'react';
import { Segment, Button } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import { Alert } from "./Alert"
import "../css/tictactoe.css"

const winningCombo = [
    "-1-2-3",
    "-4-5-6",
    "-7-8-9",
    "-1-4-7",
    "-2-5-8",
    "-3-6-9",
    "-1-5-9",
    "-3-5-7"
]
const TicTacToe = () => {
    const [board, setBoard] = useState<string[]>(["","","","","","","","",""]);
    const [next, setNext] = useState("X");
    const [player1, setPalayer1] = useState<string>("")
    const [player2, setPalayer2] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const { addMessage } = useContext(GlobalContext)

    const play = async (index: number) => {
        if (board[index] === "") {
            board[index] = next;

            await setBoard([...board]);
            
            let win = await checkWin()
            if (win) {
                addMessage(win)
                // setBoard(["","","","","","","","",""])
            } else {
                await setNext(next === "X"? "O" : "X")

                if (next === "O") {
                    // let guess = computerGuess();
                    // play(guess!)
                } else {
                  // you playy      
                }
            }
        } else {
            addMessage("Try again!")
        }
    }


    const checkWin = (): string => {
        let draw = board.every(tile => tile !== "")

        if (draw) {
            return `Draw!`
        }
        let combo = ""
        board.forEach((tile, index) => {
            if (tile === next) {
                combo += `-${index + 1}`
            }
        })

        if (winningCombo.includes(combo)) {
            return `Player ${next} wins!`
        } else {
            return ""
        };
    }

    const computerGuess = () => {
        let guess = Math.floor(Math.random() * 9);
        if (board[guess] === "") {
            console.log("final guess: ", guess);
            return guess;
        } else {
            computerGuess()
        }
        
    }

    const newGame = () => {
        setBoard(["","","","","","","","",""])
        setNext("X")
    }
    return (
        <div>
            <Alert />
            <Segment loading={loading}>
                <div className="container">
                    {board.map((tile, index) => <div key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                </div>
            </Segment>


            <Button onClick={() => newGame()}>New Game</Button>
            <Button onClick={() => computerGuess()}>Comouter Guess</Button>
        </div>

    )
}



export default TicTacToe
