import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {
  if(isWinner) return  <button className="square-winner" onClick={onSquareClick}>{value}</button>
  else return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)[0] !== "None") return;
    const nextSquares = squares.slice();

    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  const winningRows = winner[1];

  let status;
  if(winner[0] === "None") status = "Next player: " + (xIsNext ? "X" : "O");
  else if(winner[0] === "Draw") status = "Draw";
  else status = "Winner: " + winner[0];
  
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={winningRows[0]}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={winningRows[1]}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={winningRows[2]}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={winningRows[3]}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={winningRows[4]}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={winningRows[5]}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={winningRows[6]}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={winningRows[7]}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={winningRows[8]}/>
      </div>
    </React.Fragment>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); //all the items in history (previous history) and next item
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    (move > 0) ? description = 'Go to move #' + move : description = 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <React.Fragment>
    <h1 className="title">Tic-Tac-Toe</h1>
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <o1>{moves}</o1>
      </div>
    </div>
    </React.Fragment>
  );
}

function calculateWinner(squares) {
  const winner = [false, false, false, false, false, false, false, false, false];
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      for(let j=0; j < lines[i].length; j++){
        winner[j] = true;
      }
      return [squares[a], winner];
    }
  }

  let isBoardFull = true;
  for(let i=0; i < squares.length; i++){
    if(!squares[i]) isBoardFull = false;
  }

  if(isBoardFull) return ["Draw", winner];
  else return ["None", winner];
}