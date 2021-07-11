import { configureStore } from "@reduxjs/toolkit";
import gameboardSlice from "../gameboardSlice";
import { render as rtlRender, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import faker from "faker";
import React from "react";

const fakeStore = {
  gameboard: [
    {
      id: faker.datatype.uuid(),
      style: "red",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "red",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "red",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "blue",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "green",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "blue",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "yellow",
      visited: false,
    },
    {
      id: faker.datatype.uuid(),
      style: "blue",
      visited: false,
    },
  ],
  points: 0,
};

function render(
  ui,
  {
    initialState,
    store = configureStore({
      reducer: gameboardSlice.reducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

export * from "@testing-library/react";
export { render, fakeStore };
