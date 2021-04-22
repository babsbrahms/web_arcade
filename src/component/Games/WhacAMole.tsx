import React, { useState, useContext, useEffect, useRef } from 'react';
import { Segment, Button, Header, Dropdown } from "semantic-ui-react";
import Board from "../container/Board";
import { GlobalContext } from "../../context/GlobalContext"
import "./css/whacamole.css"

const boardOption = [
    {  key: "TIC", value: 3, text: "3" },
    {  key: "ROCK", value: 4, text: "4" },
    {  key: "WHAC", value: 5, text: "5" },
    {  key: "TIC-TAC", value: 6, text: "6" },
    {  key: "ROCK-PAPER", value: 7, text: "7" },
    {  key: "WHAC-A", value: 8, text: "8" },
    {  key: "WHAC-A-mole", value: 9, text: "9" },
]

const speedOption = [
    {  key: "T", value: 200, text: "0.2s" },
    {  key: "TIC", value: 300, text: "0.3s" },
    {  key: "ROCK", value: 400, text: "0.4s" },
    {  key: "WHAC", value: 500, text: "0.5s" },
    {  key: "TIC-TAC", value: 600, text: "0.6s" },
    {  key: "ROCK-PAPER", value: 700, text: "0.7s" },
    {  key: "WHAC-A", value: 800, text: "0.8s" },
    {  key: "WHAC-A-m", value: 900, text: "0.9s" },
    {  key: "WHAC-A-mole", value: 1000, text: "1s" },
]

const WhacAMole = () => {
    const [board, setBoard] = useState(["","","","","",""]);
    const [speed, setSpeed] = useState(400)
    const [disabled, setDisabled] = useState(false)
    const [position, setPostion] = useState(-1);
    const [verdict, setVerdict] = useState("")
    const [action, setAction] = useState("")
    const timer = useRef<any>()

    const { theme } = useContext(GlobalContext)

    useEffect (() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [])

    const play = async (index: number) => {
        if (action === "play" && position === index) {
            stop()
            setVerdict("win")
            setDisabled(true)
        } else if (action === "play" && position !== index) {
            setVerdict("loss")
        }
    }


    const start = () => {
        setDisabled(false)
        setAction("play")
        timer.current = setInterval(() => {
            computerGuess()
        }, speed)
    }

    const stop = () => {
        setDisabled(true)
        setAction("stop")
        clearInterval(timer.current)
    }

    const computerGuess = () => {
        let guess = Math.floor(Math.random() * board.length);
        console.log(guess);
        
        setPostion(guess)
    }


    return (
        <div>
            <Board 
                control={
                    <div className="score">
                        <Button.Group color="black">
                            <Button data-testid="start-button" disabled={action === "play"} onClick={() => start()}>Start</Button>
                            <Button data-testid="stop-button" disabled={action !== "play"} onClick={() => stop()}>Stop</Button>
                        </Button.Group>


                        <Header color={verdict === "win" ? "green" : "red"}>
                            <Header.Content data-testid="vedict">{verdict}</Header.Content>
                        </Header>
                        <Dropdown
                            data-testid="tile-dropdown"
                            text="Number of tiles"
                            placeholder=''
                            disabled={action === "play"}
                            fluid
                            selection
                            value={board.length}
                            options={boardOption}
                            onChange={(e, { value}) => setBoard(new Array(value).fill("") as string[])}
                        />

                        <Dropdown
                            data-testid="speed-dropdown"
                            text="Game Speed"
                            placeholder=''
                            fluid
                            selection
                            disabled={action === "play"}
                            value={speed}
                            options={speedOption}
                            onChange={(e, { value}) => setSpeed(value as number)}
                        />
                    </div>
                } 
            
                game={                      
                    <Segment style={{  backgroundColor: theme === "light"? "white" : "black" }} disabled={disabled}>
                        <div data-testid="board" className="wrapper">
                            {board.map((tile, index) => <div role={`${position === index? "gridcell" : ""}`} className={`${position === index? "pick" : ""}`} key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                        </div>
                    </Segment>
                } 
            />
        </div>

    )
}



export default WhacAMole
