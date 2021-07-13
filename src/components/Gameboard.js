import React, { useState, useEffect } from "react";
import { getRandomColor } from "../Colors";
import uuid from "react-uuid";
import styles from "./Gameboard.css";
import Tile from "./Tile";
import {
  checkSurroundingTiles,
  createBoardGame,
  getCords,
  getTile,
  getIndex,
} from "../common/tileUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  addTiles,
  boardSelector,
  createBoard,
  removeTiles,
} from "../gameboardSlice";
import _ from "lodash";

const Gameboard = ({size}) => {
  const [board, setBoard] = useState([]);
  let [points, setPoints] = useState(0);
  let visited = [];

  const dispatch = useDispatch();
  const gameboard = useSelector(boardSelector);

  useEffect(() => {
    dispatch(createBoard(size));

    if (gameboard.length) {
      setBoard([...gameboard]);
    }
  }, [gameboard.length]);

  const clearVisisted = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      squares[i].visited = false;
    }
    return squares;
  };

  const handleGameboardClick = (e) => {
    let [tileMapX, tileMapY] = getCords(e);
    let outcome = board[tileMapY * 5 + tileMapX];

    if (checkSurroundingTiles(board, tileMapX, tileMapY, outcome.style)) {
      floodFillIterative(tileMapX, tileMapY);
      dispatch(removeTiles({ visited: visited }));
      dispatch(addTiles({ count: visited.length }));

      incrementPoints(visited.length);
      while (visited.length > 0) {
        visited.pop();
      }
    }
  };
  const incrementPoints = (points) => {
    setPoints((prev) => prev + points);
  };
  const floodFillIterative = (tileMapX, tileMapY) => {
    const colorToLookFor = board[getIndex(tileMapX, tileMapY)].style;
    const key = board[getIndex(tileMapX, tileMapY)].key;
    const id = board[getIndex(tileMapX, tileMapY)].id;
    let squares = JSON.parse(JSON.stringify(board));

    const stack = [[tileMapX, tileMapY]];
    while (stack.length) {
      const squareCoordinates = stack.pop();
      let newI = squareCoordinates[0];
      let newJ = squareCoordinates[1];

      if (newI < 0 || newI >= 5) continue;
      if (newJ < 0 || newJ >= 5) continue;

      let nextSquare = { ...squares[getIndex(newI, newJ)] };

      if (nextSquare.style !== colorToLookFor) continue;
      if (nextSquare.visited) continue;

      Array.prototype.push.apply(stack, [
        [newI - 1, newJ],
        [newI + 1, newJ],
        [newI, newJ - 1],
        [newI, newJ + 1],
      ]);

      visited.push({
        key: nextSquare.key,
        id: id,
        style: colorToLookFor,
        visited: false,
      });

      squares[getIndex(newI, newJ)].visited = true;
    }
    clearVisisted(squares);
  };

  return (
    <>
      <div data-testid="points">Punkty: {points}</div>
      <div id="gameboard" onMouseDown={(e) => handleGameboardClick(e)}>
        {board.map((row) => (
          <Tile
            key={row.id}
            id={row.id}
            style={row.style}
            visited={row.false}
          />
        ))}
      </div>
    </>
  );
};
export default Gameboard;
