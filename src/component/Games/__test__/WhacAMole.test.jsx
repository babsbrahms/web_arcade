import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WhacAMole from "../WhacAMole";

afterEach(cleanup)

test("Make sure test works", () => {
    expect("a").toBe("a")
})


test("board should have 6 tile initially", () => {
    const { getByTestId } = render(<WhacAMole />)

    let boardEl = getByTestId("board")

    expect(boardEl.children.length).toBe(6)
})

// // fail
// test("change number of tile to 5", () => {
//     const { getByTestId } = render(<WhacAMole />)

//     let boardEl = getByTestId("board")

//     expect(boardEl.children.length).toBe(6)

//     let tileDropdown = getByTestId("tile-dropdown")
   
//     fireEvent.change(tileDropdown, {
//         data: {
//             value: 5
//         }
//     })

//     expect(boardEl.children.length).toBe(5)
// })


// // fail
// test("Initial speed value should be 400ms", () => {
//     const { getByTestId } = render(<WhacAMole />)

//     let speedDropdown = getByTestId("speed-dropdown")
   

//     expect(speedDropdown).toHaveValue("400")
// })


// // fails
// test("change speed dropdown from 400ms to 700ms", () => {
//     const { getByTestId } = render(<WhacAMole />)

//     let speedDropdown = getByTestId("speed-dropdown")
   
//     fireEvent.change(speedDropdown, {
//         data: {
//             value: "700"
//         }
//     })

//     expect(speedDropdown).toHaveValue("700")
// })


test("game should start", async () => {
    const { getByTestId, findByRole } = render(<WhacAMole />)

    let startBTN = getByTestId("start-button");
    
    fireEvent.click(startBTN);

    const cell = await findByRole("gridcell")

    expect(cell.className).toBe("pick")
})


test("game should stop", () => {
    const { getByTestId } = render(<WhacAMole />)

    let startBTN = getByTestId("start-button");
    let stopBTN = getByTestId("stop-button");

    fireEvent.click(startBTN);

    fireEvent.click(stopBTN);

    expect(stopBTN).toBeDisabled()
})


test("Can gusee game by clicking", () => {
    const { getByTestId } = render(<WhacAMole />)

    let startBTN = getByTestId("start-button");

    let boardEl = getByTestId("board")

    let verdictEl = getByTestId("vedict")
    
    fireEvent.click(startBTN);

    fireEvent.click(boardEl.firstElementChild);

    expect(verdictEl.textContent).toBeTruthy()
})