import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RockPaperScissors from "../RockPaperScissors";

afterEach(cleanup)

test("Make sure test works", () => {
    expect("a").toBe("a")
})


test("board should have 3 tile", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let boardEl = getByTestId("board")

    expect(boardEl.children.length).toBe(3)
})


test("Clicking rock tile should guess rock", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let rockdEl = getByTestId("rock");
    let playerGuess = getByTestId("player")

    expect(playerGuess).toHaveTextContent("");
    
    fireEvent.click(rockdEl)

    expect(playerGuess.textContent).toMatch(/rock/ig);
})

test("Clicking paper tile should guess paper", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let paperEl = getByTestId("paper");
    let playerGuess = getByTestId("player")

    expect(playerGuess).toHaveTextContent("");
    
    fireEvent.click(paperEl)

    expect(playerGuess.textContent).toMatch(/paper/ig);


})


test("Clicking scissor tile should guess scissors", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let scissorsEl = getByTestId("scissors");
    let playerGuess = getByTestId("player")

    expect(playerGuess).toHaveTextContent("");
    
    fireEvent.click(scissorsEl)

    expect(playerGuess.textContent).toMatch(/scissors/ig);

    
})


test("Guess should no be less than 2", () => {    

    let random = Math.floor(Math.random() * 3)

    expect(random).toBeLessThanOrEqual(2);

})


test("Clicking board should make computer guess either rock, paper or scissors", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let scissorsEl = getByTestId("scissors")
    let computerGuess = getByTestId("computer")


    fireEvent.click(scissorsEl)

    expect(["rock", "paper", "scissors"]).toContain(computerGuess.textContent);

})

test("Clicking board should make 2 guesses", () => {
    const { getByTestId } = render(<RockPaperScissors />)

    let rockEl = getByTestId("rock")
    let computerGuess = getByTestId("computer");
    let playerGuess = getByTestId("player");

    let options = ["rock", "paper", "scissors"];
    fireEvent.click(rockEl)

    expect(options).toContain(computerGuess.textContent);
    expect(playerGuess.textContent).toBe("rock")
})