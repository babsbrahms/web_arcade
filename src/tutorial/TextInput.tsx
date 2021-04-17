import { count } from 'console';
import React, { useState, useRef } from 'react';
import { Counter } from "./Counter"

interface Props {
    text: string,
    ok?: true,
    option: "one" | "two" | "three",
    onSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextNode {
    text: ""
}
export const TextInput: React.FC<Props> = ({ text, onSubmit}) => {
    const [word, setWord] = useState<string | null | TextNode>("");
    const inputRef = useRef<HTMLInputElement>(null)


    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
        onSubmit(e)
    }

    return (
        <div>
            <input ref={inputRef} value={text} onChange={(e) => change(e)} />
            <Counter>
    {(count, setCount) => <div><button onClick={() => setCount(count + 1)}>like | {count}</button></div>}
            </Counter>
        </div>
    )
}
 