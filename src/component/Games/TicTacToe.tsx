import React, { useState, useContext, useEffect } from 'react';
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
    {  key: "TIC-2", value: "Player 1 VS Computer", text: "Player 1 VS Computer" },
    {  key: "TIC-1", value: "Player 1 VS Player 2", text: "Player 1 VS Player 2" },
]


const TicTacToe = () => {
    const [board, setBoard] = useState<string[]>(["","","","","","","","",""]);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [player, setPlayer] = useState({ player1: "Player 1", player2: "Computer", text: "Player 1 VS Computer"})
    const [winner, setWinner] = useState("");
    const [victoryCombo, setVictoryCombo] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const { addMessage, theme } = useContext(GlobalContext);

    useEffect(() => {
        if (currentPlayer === "O" && player.player2 === "Computer") {
            computerGuess()
        }
    }, [currentPlayer])

    const play = (index: number) => {
        if (winner) {
            addMessage(`Player ${winner} win the game. You can start a new game!`);
            return;
        }
        if (board[index] === "") {
            board[index] = currentPlayer;

            setBoard([...board]);
            
            let win = checkWin()
            if (win) {
                
                addMessage(win)
                // setBoard(["","","","","","","","",""])
            } else {
                console.log("currentPlayer: ", currentPlayer);   
                setCurrentPlayer(currentPlayer === "X"? "O" : "X")
                    
                chechNextPlay()       
            }
        } else {
            addMessage("Try again!")
        }
    }


    const chechNextPlay = () => {
        console.log("nextPlayer: ", currentPlayer); 
        if (currentPlayer === "O" && player.player2 === "Computer") {
            
        }
    }

    const checkWin = (): string => {
        let win = checkRoundWin()
        
        if (win) {
            setLoading(true)
            setWinner(currentPlayer)
            return `Player ${currentPlayer} wins!`

        } else {
            let draw = board.every(tile => tile !== "")

            if (draw) {
                setLoading(true)
                return `Draw!`
            }
            return ""
        };
    }

    const checkRoundWin = () => {
        const winningCombo = [ "012", "345", "678", "036", "147", "258", "048", "246" ];
        let combo: string[] = [];
        let win = false;
        
        // get combo for current player
        board.forEach((tile, index) => {
            if (tile === currentPlayer) {
                combo.push(index.toString())
            }
        });


        for (let x of winningCombo) {
            let splitted = x.split("");

            if (combo.includes(splitted[0]) && combo.includes(splitted[1]) && combo.includes(splitted[2])) {
                win = true;
                var vic = splitted.map((item) => parseInt(item, 10));
                setVictoryCombo(vic);

                break;
            }
        }

        return win
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
        setCurrentPlayer("X");
        setVictoryCombo([]);
        setLoading(false);
        setWinner("")
    }

    
    return (
        <div>
            <Board 
                control={
                    <div className="score-ttt">
                        <Button.Group data-testid="new-game" color="black">
                            <Button onClick={() => {
                                
                                newGame();
                                
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
                            data-testid="player-dropdown"
                            text="Player1 vs ..."
                            placeholder=''
                            fluid 
                            selection
                            value={player.text}
                            options={playerOption}
                            onChange={(e, data) => pickPlayerType(data)}
                        />

                        <Header >
                        <Header.Content>Current Player: <span data-testid="next">{currentPlayer === "X"? player.player1.toUpperCase() : player.player2.toUpperCase()}</span></Header.Content>
                        </Header>

                    </div>
                } 
            
                game={                      
                    <Segment style={{  backgroundColor: theme === "light"? "white" : "black" }} disabled={loading}>
                        <div data-testid="board" className="container">
                            {board.map((tile, index) => <div className={`${(winner !== "") && (victoryCombo.includes(index))? "win" : ""}`} key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                        </div>
                    </Segment>
                } 
            />
        </div>

    )
}



export default TicTacToe
