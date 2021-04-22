import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../Home";

afterEach(cleanup)

test("Make sure test works", () => {
    expect("a").toBe("a")
})
