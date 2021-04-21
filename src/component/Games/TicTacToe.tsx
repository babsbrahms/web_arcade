import React, { useState, useContext } from 'react';
import { Segment, Button, Header, Dropdown, DropdownProps } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import Board from "../container/Board";
import "./css/tictactoe.css"

// interface PlayerType {
//     player1: string, 
//     player2: string, 
//     text: string
// }


// interface OptionType {
//     key: string, 
//     value: PlayerType, 
//     text: string
// }

const playerOption = [
    {  key: "TIC-1", value: "Player 1 VS Player 2", text: "Player 1 VS Player 2" },
    {  key: "TIC-2", value: "Player 1 VS Computer", text: "Player 1 VS Computer" },
]

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
    const [player, setPlayer] = useState({ player1: "Player 1", player2: "Computer", text: "Player 1 VS Computer"})
    const [winner, setWinner] = useState("")
    const [loading, setLoading] = useState(false)
    const { addMessage } = useContext(GlobalContext)

    const play = async (index: number) => {
        if (winner) {
            addMessage(`Player ${winner} win the game. You can start a new game!`);
            return;
        }
        if (board[index] === "") {
            board[index] = next;

            await setBoard([...board]);
            
            let win = await checkWin()
            if (win) {
                
                addMessage(win)
                // setBoard(["","","","","","","","",""])
            } else {
                await setNext(next === "X"? "O" : "X")
            }
        } else {
            addMessage("Try again!")
        }
    }


    const checkWin = (): string => {
        let combo = ""
        board.forEach((tile, index) => {
            if (tile === next) {
                combo += `-${index + 1}`
            }
        })

        if (winningCombo.includes(combo)) {
            setLoading(true)
            setWinner(next)
            return `Player ${next} wins!`

        } else {
            let draw = board.every(tile => tile !== "")

            if (draw) {
                setLoading(true)
                return `Draw!`
            }
            return ""
        };
    }

    const computerGuess = () => {
        let draw = board.every(tile => tile !== "");

        if (!draw) {
            let guess = Math.floor(Math.random() * board.length);
            if (board[guess] === "") {
                console.log("final guess: ", guess);
                // return guess;
                play(guess)
            } else {
                computerGuess()
            }
        } else {
            addMessage("Draw!")
        } 
    }

    const pickPlayerType = (data: DropdownProps) => {
        let [player1, player2] = (data.value as string).split(" VS ")
        setPlayer({ player1, player2, text: (data.value as string) })
    }

    const newGame = () => {
        setBoard(["","","","","","","","",""])
        setNext("X")
    }
    return (
        <div>
            <Board 
                control={
                    <div className="score-ttt">
                        <Button.Group color="black">
                            <Button onClick={() => {
                                setLoading(false)
                                newGame();
                                setWinner("")
                            }}>New Game</Button>
                            {/* <Button onClick={() => computerGuess()}>Computer Guess</Button> */}
                        </Button.Group>

                        <Header color={winner === "X" ? "green" : "red"}>
                            <Header.Content>{player.player1}: <span  data-testid="player">X</span></Header.Content>
                        </Header>

                        <Header color={winner === "O" ? "green" : "red"} >
                            <Header.Content>{player.player2}: <span  data-testid="computer">O</span></Header.Content>
                        </Header>


                        <Dropdown
                            text="Player1 vs ..."
                            placeholder=''
                            fluid 
                            selection
                            value={player.text}
                            options={playerOption}
                            onChange={(e, data) => pickPlayerType(data)}
                        />

                        <Header >
                        <Header.Content>NEXT: <span>{next === "X"? player.player1.toUpperCase() : player.player2.toUpperCase()}</span></Header.Content>
                        </Header>

                    </div>
                } 
            
                game={                      
                    <Segment disabled={loading}>
                        <div className="container">
                            {board.map((tile, index) => <div className={`${(winner !== "") && (winner === tile)? "win" : ""}`} key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                        </div>
                    </Segment>
                } 
            />
        </div>

    )
}



export default TicTacToe
