import React from "react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import Gameboard from "../components/Gameboard";
import store from "../store";
import {
  render,
  screen,
  debug,
  fakeStore,
  getByLabelText,
  getByTestId,
} from "../utils/test-utils";
import { createBoard } from "../gameboardSlice";
import { getTile } from "../common/tileUtils";

// describe("Gameboard", () => {
//   test("Gameboard, given initial render, displays 0 points", () => {
//     const result = render(<Gameboard />, { initialState: fakeStore });

//     expect(result.getByTestId("points")).toHaveTextContent("0");
//   });
// });

// test("should return initial state", () => {
//   // const createBoard = { type: "CREATE_BOARD" };
//   const initialState = {
//     gameboard: [],
//     points: 0,
//   };
//   const NotExistingMethod = () => undefined;
//   store.dispatch(NotExistingMethod(undefined, {}));

//   expect(store.getState().gameboard).toEqual(initialState);
// });

describe("gameboardSlice", () => {
  test("should handle the createBoard action and getState", () => {
    store.dispatch(createBoard( { payload: {size:5}  } ));

    expect(store.getState().gameboard.gameboard).toHaveLength(25);
  });
});

describe("tile-utils", () => {
  test("should handle getTile and return specific tile", () => {
    const mockedBoardStore = fakeStore.gameboard;
    //console.log(getTile(mockedBoardStore, 0, 0, 1, 1));
    //expect(getTile(mockedBoardStore,0,0,1,1)).toHaveTextContent("0");
  });
});
