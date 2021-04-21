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

test("Second player should initially be computer", () => {
    const { getByTestId, getByText } = render(<TicTacToe />)

    let computer = getByText("Computer:")

    expect(computer).toBeInTheDocument()
})


// /// fail
// test("can change player", () => {
//     const { getByTestId, getByText } = render(<TicTacToe />)

//     let playerDropdown = getByTestId("player-dropdown")

//     fireEvent.change(playerDropdown, {
//         data: {
//             value: "Player 1 VS Player 2"
//         }
//     })

//     let computer = getByText("Player 2:")

//     expect(computer).toBeInTheDocument()
// })


test("can get next player", () => {
    const { getByTestId } = render(<TicTacToe />)

    let boardEl = getByTestId("board")
    let next = getByTestId("next")

    fireEvent.click(boardEl.children[0])

    expect(next).toHaveTextContent("O")
})


test("First click should play X", () => {
    const { getByTestId } = render(<TicTacToe />)

    let boardEl = getByTestId("board")

    fireEvent.click(boardEl.children[0])

    expect(boardEl.children[0]).toHaveTextContent("X")
})


test("Second click should play O", () => {
    const { getByTestId } = render(<TicTacToe />)

    let boardEl = getByTestId("board")

    fireEvent.click(boardEl.children[0])
    fireEvent.click(boardEl.children[1])

    expect(boardEl.children[0]).toHaveTextContent("X")
})

test("Cannot play on thesame tile twice", () => {
    const { getByTestId } = render(<TicTacToe />)

    let boardEl = getByTestId("board")

    fireEvent.click(boardEl.children[0])
    // fireEvent.click(boardEl.children[0])

    expect(boardEl.children[0]).toHaveTextContent("X")
})


// test("Can start new game after playing", () => {
//     const { getByTestId } = render(<TicTacToe />)

//     let boardEl = getByTestId("board")
//     let NewGameBTN = getByTestId("new-game")

//     fireEvent.click(boardEl.children[0])
//     fireEvent.click(boardEl.children[1])
//     fireEvent.click(boardEl.children[2])

//     fireEvent.click(NewGameBTN)

//     expect(boardEl.children[0].children[0]).toHaveTextContent("")
// })


