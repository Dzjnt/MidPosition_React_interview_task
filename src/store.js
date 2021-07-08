import { configureStore } from "@reduxjs/toolkit";

import gameboardSlice from "./gameboardSlice.js";

const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return next(action);
    }
  };

const store = configureStore({
  reducer: { gameboard: gameboardSlice },
  middleware: [thunk],
});

export default store;
