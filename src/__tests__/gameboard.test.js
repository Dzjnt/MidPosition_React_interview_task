import React from "react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import Gameboard from "../components/Gameboard";
import {
  render,
  screen,
  debug,
  fakeStore,
  getByLabelText,
  getByTestId,
} from "../utils/test-utils";

describe("Gameboard", () => {
  test("Gameboard, given initial render, displays 0 points", () => {
    const result = render(<Gameboard />, { initialState: fakeStore });
    //console.log(result.wrapper.getState())
    expect(result.getByTestId("points")).toHaveTextContent("0");
  });

  test("Bbalbllb", () => {
    const { getByText } = render(<App />);

    expect(getByText("elo")).toBeInTheDocument();
  });
});
