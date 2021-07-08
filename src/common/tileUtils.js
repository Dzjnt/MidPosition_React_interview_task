import { getRandomColor } from "../Colors";
import uuid from "react-uuid";

export const checkSurroundingTiles = (
  board,
  columnIndex,
  rowIndex,
  colorToLookFor
) => {
  return [
    getTile(board, 5, columnIndex + 1, rowIndex),
    getTile(board, 5, columnIndex - 1, rowIndex),
    getTile(board, 5, columnIndex, rowIndex + 1),
    getTile(board, 5, columnIndex, rowIndex - 1),
  ]
    .filter((x) => x !== undefined)
    .some((x) => {
      return x.style === colorToLookFor;
    });
};

export const getTile = (board, cell, columnIndex, rowIndex) => {
  if (
    columnIndex < 0 ||
    rowIndex < 0 ||
    columnIndex > cell - 1 ||
    rowIndex > 5 - 1
  )
    return;

  return board[rowIndex * cell + columnIndex];
};

export const getIndex = (x, y) => {
  return x + 5 * y;
};

export const getCords = (e) => {
  let rect = e.currentTarget.getBoundingClientRect(),
    offsetX = e.clientX - rect.left,
    offsetY = e.clientY - rect.top;

  let tileMapX = Math.floor(offsetX / 100);
  let tileMapY = Math.floor(offsetY / 100);

  return [tileMapX, tileMapY];
};

export const createBoardGame = (size) => {
  const newBoard = []; 

  if (!isNaN(size)) {
    for (let j = 0; j < size * size; j++) {
      let id = uuid();
      newBoard[j] = {
        key: id,
        id: id,
        style: getRandomColor(),
        visited: false,
      };
    }
  }

  return newBoard;
};

export const createTiles = (count) => {
  let newTiles = [];

  for (let i = 0; i < count; i++) {
    let id = uuid();
    newTiles[i] = {
      key: id,
      id: id,
      style: getRandomColor(),
      visited: false,
    };
  }
  return newTiles;
};
