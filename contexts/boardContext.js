import React from 'react';

import { getNewBoard, getWinningSquares, isAllFilled } from "../utils";

const BoardStateContext = React.createContext()
const BoardDispatchContext = React.createContext()
const boardReducer = (state, action) => {
  switch (action.type) {
    case 'setCell': {
      const { row, col } = action.payload;
      const newBoard = state.board.map(
        (cells, rowIdx) => cells.map((cell, colIdx) => rowIdx === row && colIdx === col ? state.currentUser : cell)
      );
      const winningSquares = getWinningSquares(newBoard);
      const allFilled = isAllFilled(newBoard);
      let winner = null;
      if (winningSquares.length > 0) {
        winner = newBoard[winningSquares[0][0]][winningSquares[0][1]];
      }
      return {
        board: newBoard,
        currentUser: state.currentUser === 'x' ? 'o' : 'x',
        status: (winningSquares.length > 0 || allFilled) ? 'finished' : 'playing',
        winningSquares,
        winner,
      };
    }
    case 'resetBoard': {
      return { board: getNewBoard(), currentUser: 'x', status: 'playing', winningSquares: [], winner: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const BoardProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(boardReducer, {
    board: getNewBoard(),
    currentUser: 'x',
    status: 'playing',
    winningSquares: [],
    winner: null,
  });
  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  )
}

const useBoardState = () => {
  const context = React.useContext(BoardStateContext)
  if (context === undefined) {
    throw new Error('useBoardState must be used within a BoardProvider')
  }
  return context
}

const useBoardDispatch = () => {
  const context = React.useContext(BoardDispatchContext)
  if (context === undefined) {
    throw new Error('useBoardDispatch must be used within a BoardProvider')
  }
  return context
}

const setCell = (row, col) => ({ type: 'setCell', payload: { row, col } });
const resetBoard = () => ({ type: 'resetBoard' });

export {BoardProvider, useBoardState, useBoardDispatch, setCell, resetBoard}
