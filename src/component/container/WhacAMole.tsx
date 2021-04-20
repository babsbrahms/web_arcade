import React, { useState, useContext, useEffect, useRef } from 'react';
import { Segment, Button } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";
import "../css/whacamole.css"


const WhacAMole = () => {
    const [board, setBoard] = useState<string[]>(["","","","","","","","",""]);
    const [position, setPostion] = useState(-1);
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState("")
    const { addMessage } = useContext(GlobalContext)
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
            addMessage("Win")
        } else if (action === "play" && position !== index) {
            addMessage("Miss")
        }
    }


    const start = () => {
        setAction("play")
        timer.current = setInterval(() => {
            computerGuess()
        }, 500)
    }

    const stop = () => {
        setAction("stop")
        clearInterval(timer.current)
    }

    const computerGuess = () => {
        let guess = Math.floor(Math.random() * 9);
        console.log(guess);
        
        setPostion(guess)
    }


    return (
        <div>
            <Segment disabled={loading}>
                <div className="wrapper">
                    {board.map((tile, index) => <div className={`${position === index? "pick" : ""}`} key={`key-${index}`} onClick={() => play(index)}> <h1>{tile}</h1> </div>)}
                </div>
            </Segment>


            <Button disabled={action === "play"} onClick={() => start()}>Start</Button>
            <Button disabled={action !== "play"} onClick={() => stop()}>Stop</Button>
        </div>

    )
}



export default WhacAMole
