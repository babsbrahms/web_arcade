import React, { useState, useContext, useEffect, useRef } from 'react';
import { Segment, Button, Header } from "semantic-ui-react";
import Board from "../container/Board";
import "./css/whacamole.css"


const WhacAMole = () => {
    const board = ["","","","","",""];
    const [position, setPostion] = useState(-1);
    const [verdict, setVerdict] = useState("")
    const [action, setAction] = useState("")
    const timer = useRef<any>()

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
        } else if (action === "play" && position !== index) {
            setVerdict("loss")
        }
    }


    const start = () => {
        setAction("play")
        timer.current = setInterval(() => {
            computerGuess()
        }, 400)
    }

    const stop = () => {
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
                            <Button disabled={action === "play"} onClick={() => start()}>Start</Button>
                            <Button disabled={action !== "play"} onClick={() => stop()}>Stop</Button>
                        </Button.Group>


                        <Header color={verdict === "win" ? "green" : "red"}>
                            <Header.Content data-testid="vedict">{verdict}</Header.Content>
                        </Header>
                    </div>
                } 
            
                game={                      
                    <Segment>
                        <div className="wrapper">
                            {board.map((tile, index) => <div className={`${position === index? "pick" : ""}`} key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                        </div>
                    </Segment>
                } 
            />
        </div>

    )
}



export default WhacAMole
