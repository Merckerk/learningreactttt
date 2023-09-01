import React from "react";
import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isFinished, setIsFinished] = useState(false);
  const [status, setStatus] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus("Winner: " + winner);
      setIsFinished(true);
    } else if (squares.every((sqr) => sqr !== null)) {
      // If all squares are filled, and there's no winner, it's a draw
      setIsFinished(true);
      setStatus("Draw");
    } else {
      setStatus("Next player: " + (xIsNext ? "X" : "O"));
    }
  }, [squares]);

  useEffect(() => {
    console.log("status: ", status);
  }, [status]);

  useEffect(() => {
    console.log("squares: ", squares);
  }, [squares]);

  useEffect(() => {
    saveGameResult(status, squares);
  }, [isFinished]);

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//saveResults function.
function saveGameResult(sStat, sSquares) {
  console.log("Saving status: ", sStat);
  console.log("Saving sBoard: ", sSquares);

  const sSquaresJSON = JSON.stringify(sSquares);
  fetch("C:/xampp/htdocs/learningreactttt/src/public/save_result.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `winner=${sStat}&board=${sSquaresJSON}`,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error("Error:", error));
}
