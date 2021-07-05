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

const Gameboard = () => {
  const [board, setBoard] = useState([]);
  let [points, setPoints] = useState(0);
  let row = 5;
  let cell = 5;
  let visited = [];

  const dispatch = useDispatch();
  const gameboard = useSelector(boardSelector);

  // useEffect(() => {
  //   dispatch(createBoard());

  //   console.log(gameboard);

  //   if (gameboard.length) {
  //     console.log(gameboard);
  //     setBoard([...gameboard]);
  //   }
  // }, [gameboard.length]);

  // useEffect(() => {
  //   setBoard(createBoardGame());
  // }, []);
  const addNewTilesAtStart = (visited) => {
    let newSquares = [];
    let copy = board;

    copy = copy.filter(
      (tile) => !visited.find((visitedTile) => tile.key === visitedTile.key)
    );

    for (let i = 0; i < visited.length; i++) {
      let id = uuid();
      newSquares[i] = {
        key: id,
        id: id,
        style: getRandomColor(),
        visited: false,
      };
    }
    console.log(copy);
    const newArr = newSquares.concat(copy);

    return newArr;
  };

  const clearVisisted = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      squares[i].visited = false;
    }
    return squares;
  };

  const handleGameboardClick = (e) => {
    let [tileMapX, tileMapY] = getCords(e);
    console.log(tileMapX);
    console.log(tileMapY);
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
      console.log(Object.isFrozen(nextSquare));
      console.log(Object.isFrozen(squares));
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
