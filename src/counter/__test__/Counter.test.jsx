import React from "react";
import Counter from "../Counter"
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;
// it runs befor each test
beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
})

// IT RUN AFTER EACH TEST
afterEach(() => {
    cleanup()
})

test("Header renders with correct text", () => {
   const headerEl = getByTestId("header");

   expect(headerEl.textContent).toBe("My Counter")
})


test("counter initially start with text of zero", () => {
    const counterEl = getByTestId("counter");

    expect(counterEl.textContent).toBe("0")
})

test("Initial text input value should be 1", () => {
    const inputEl = getByTestId("input");

    expect(inputEl.value).toBe("1")
})


test("Add button render with + sign", () => {
    const addBtn = getByTestId("add-btn");

    expect(addBtn.textContent).toBe("+")
})


test("Subtract button render with - sign", () => {
    const subBtn = getByTestId("sub-btn");

    expect(subBtn.textContent).toBe("-")
})

test("Changing value of input works correctly", () => {
    const inputEl = getByTestId("input")

    fireEvent.change(inputEl, { 
        target: {
            value: "5"
        }
    })

    expect(inputEl.value).toBe("5")
})

test("clicking add btn increment counter", () => {
    const addBtn = getByTestId("add-btn");
    const counter = getByTestId("counter");

    expect(counter.textContent).toBe("0")

    fireEvent.click(addBtn)

    expect(counter.textContent).toBe("1")
})

test("clicking subtract btn decrement counter", () => {
    const subBtn = getByTestId("sub-btn");
    const counter = getByTestId("counter");

    expect(counter.textContent).toBe("0")
    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("-1")
})


test("changing input element and clicking on add button works", () => {
    const addBtn = getByTestId("add-btn");
    const counter = getByTestId("counter");
    const inputEl = getByTestId("input")

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    expect(inputEl.value).toBe("5")

    fireEvent.click(addBtn)

    expect(counter.textContent).toBe("5")
})


test("changing input element and clicking on subtract button works", () => {
    const subBtn = getByTestId("sub-btn");
    const counter = getByTestId("counter");
    const inputEl = getByTestId("input")

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    expect(inputEl.value).toBe("5")

    fireEvent.click(subBtn)

    expect(counter.textContent).toBe("-5")
})


test("adding and substracting leads to the correct counter number", () => {
    const subBtn = getByTestId("sub-btn");
    const addBtn = getByTestId("add-btn");
    const counter = getByTestId("counter");
    const inputEl = getByTestId("input")

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(subBtn)    

    expect(counter.textContent).toBe("5")

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }
    })

    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(addBtn)
    fireEvent.click(subBtn) 
    fireEvent.click(subBtn)

    expect(counter.textContent).toBe("15")
})


test("counter contains correct class name", () => {

    const counter = getByTestId("counter");
    const subBtn = getByTestId("sub-btn");
    const addBtn = getByTestId("add-btn");
    const inputEl = getByTestId("input")

    expect(counter.className).toBe("")

    fireEvent.change(inputEl, {
        target: {
            value: "50"
        }
    })

    fireEvent.click(addBtn)
    expect(counter.className).toBe("")

    fireEvent.click(addBtn)
    expect(counter.className).toBe("green")
    expect(counter.textContent).toBe("100")


    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("50")
    expect(counter.className).toBe("")
    
    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    fireEvent.click(subBtn)


    expect(counter.className).toBe("red")
    expect(counter.textContent).toBe("-100")

})