import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TicTacToe from "../TicTacToe";

afterEach(cleanup)

test("Make sure test works", () => {
    expect("a").toBe("a")
})


test("board should have 9 tile initially", () => {
    const { getByTestId } = render(<TicTacToe />)

    let boardEl = getByTestId("board")

    expect(boardEl.children.length).toBe(9)
})

test("can click board", () => {

})

test("First click shoul play X", () => {
    
})


test("Second click should play 0", () => {
    
})