import { createSlice } from "@reduxjs/toolkit";
import { createBoardGame, createTiles } from "./common/tileUtils";

const initialState = {
  gameboard: [],
  points: 0,
};

const gameboardSlice = createSlice({
  name: "gameboard",
  initialState,
  reducers: {
    createBoard: (state, { payload }) => {
      const {
        payload: { size },
      } = payload;

      const newBoard = createBoardGame(size);
      state.gameboard = newBoard;
    },
    addTiles: (state, action) => {
      const { count } = action.payload;

      const newTiles = createTiles(count);


      state.gameboard = [...newTiles, ...state.gameboard];
    },
    removeTiles: (state, action) => {
      const { visited } = action.payload;

      state.gameboard = state.gameboard.filter(
        (tile) => !visited.find((visitedTile) => tile.key === visitedTile.key)
      );
    },
  },
});

export const { createBoard, addTiles, removeTiles } = gameboardSlice.actions;

export const boardSelector = (state) => state.gameboard.gameboard;
export default gameboardSlice.reducer;
