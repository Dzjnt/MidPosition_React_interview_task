import { configureStore } from "@reduxjs/toolkit";

import gameboardSlice from "./gameboardSlice.js";

const store = configureStore({
  reducer: { gameboard: gameboardSlice },
});

export default store;
