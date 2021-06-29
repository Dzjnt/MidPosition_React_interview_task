import { createReducer } from "@reduxjs/toolkit";

import { createBoardGame, createTiles } from "./common/tileUtils";

const gameboardReducer = createReducer([], (builder) => {
  builder
    .addCase("CREATE_BOARD", (state, action) => {
      const { size } = action.payload;
      const newBoard = createBoardGame();

      state.push(newBoard);
    })
    .addCase("ADD_TILES", (state, action) => {
      const { count } = action.payload;

      const newTiles = createTiles(count);
      const newBoard = newTiles.concat(state);

      state = newBoard;
    })
    .addCase("REMOVE_TILES", (state, action) => {
      const { visitedTiles } = action.payload;

      return state.filter(
        (tile) =>
          !visitedTiles.find((visitedTile) => tile.key === visitedTile.key)
      );
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});
export default gameboardReducer;
