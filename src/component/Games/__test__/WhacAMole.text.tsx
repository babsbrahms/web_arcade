import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WhacAMole from "../WhacAMole";

afterEach(cleanup)

test("Make sure test works", () => {
    expect("a").toBe("a")
})


test("board should have 3 tile initially", () => {
    const { getByTestId } = render(<WhacAMole />)

    let boardEl = getByTestId("board")

    expect(boardEl.children.length).toBe(3)
})