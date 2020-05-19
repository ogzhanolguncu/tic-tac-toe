import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

const App = () => {
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });
  const [table, setTable] = useState(["", "", "", "", "", "", "", "", ""]);
  const [grid, setGrid] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });
  //True means X's turn
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const opacityOn = useSpring({
    opacity: gameOver ? 1 : 0,
    config: { duration: 700 },
  });
  const opacityOff = useSpring({
    opacity: gameOver ? 0 : 1,
    config: { duration: 700 },
  });
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const markTable = (newTable, currentIndex, turn) => {
    switch (currentIndex) {
      case "1":
        turn ? (newTable[0] = "X") : (newTable[0] = "O");
        break;
      case "2":
        turn ? (newTable[1] = "X") : (newTable[1] = "O");
        break;
      case "3":
        turn ? (newTable[2] = "X") : (newTable[2] = "O");
        break;
      case "4":
        turn ? (newTable[3] = "X") : (newTable[3] = "O");
        break;
      case "5":
        turn ? (newTable[4] = "X") : (newTable[4] = "O");
        break;
      case "6":
        turn ? (newTable[5] = "X") : (newTable[5] = "O");
        break;
      case "7":
        turn ? (newTable[6] = "X") : (newTable[6] = "O");
        break;
      case "8":
        turn ? (newTable[7] = "X") : (newTable[7] = "O");
        break;
      case "9":
        turn ? (newTable[8] = "X") : (newTable[8] = "O");
        break;
      default:
        break;
    }
    setTable(newTable);
  };

  const createPlayerArrayAtEachStep = () => {
    return table.reduce((acc, currentVal, index) => {
      if (turn && currentVal === "X") acc.push(index);
      if (!turn && currentVal === "O") acc.push(index);
      return acc;
    }, []);
  }

  const checkWinningConditionsAndSetGameOver = (gameTable) => {
    !!winningConditions.find((winningArray) =>
      winningArray.every((number) => gameTable.includes(number))
    ) && setGameOver(!gameOver);
  };
  const handleClick = ({ target }) => {
    const newTable = table;
    const currentIndex = target.getAttribute("data-grid");

    if (gameOver) return null;
    if (!table[currentIndex - 1]) {
      setGrid({ ...grid, [target.getAttribute("data-grid")]: true });
      markTable(newTable, currentIndex, turn);
      setTurn(!turn);
    }

    checkWinningConditionsAndSetGameOver(createPlayerArrayAtEachStep())
  };

  const resetTable = () => {
    setTable(["", "", "", "", "", "", "", "", ""]);
    setTurn(true);
    setGameOver(!gameOver);
  };

  return (
    <div className="container m-auto">
      <div className="p-4 m-4 text-center">
        <h1 className="text-4xl font-bold text-gray-100">
          Ready for tic-tac-toe ?
        </h1>
        <p className="text-gray-100 text-2xl font-bold">X moves first</p>
      </div>
      <animated.div style={gameOver ? animation : opacityOff} className="flex">
        <div className="grid m-auto">
          {table.map((value, index) => {
            return (
              <div
                key={index}
                className="customDiv"
                onClick={handleClick}
                data-grid={index + 1}
              >
                {table[index] === "X" && (
                  <h1
                    className={`text-white text-4xl font-bold flex justify-center mt-50 playerXColor ${
                      !grid[index + 1] && "invisible"
                    }`}
                  >
                    X
                  </h1>
                )}
                {table[index] === "O" && (
                  <h1
                    className={`text-white text-4xl font-bold flex justify-center mt-50 playerYColor ${
                      !grid[index + 1] && "invisible"
                    }`}
                  >
                    O
                  </h1>
                )}
              </div>
            );
          })}
        </div>
      </animated.div>
      <div className="p-4 m-4 text-center">
        {!table.includes("") && !gameOver && (
          <>
            <h1 className="text-4xl font-bold text-gray-100">Draw</h1>
            <button
              className="w-48 font-bold rounded customButton text-2xl py-2 px-4 mt-5"
              onClick={resetTable}
            >
              Reset
            </button>
          </>
        )}
        {gameOver && (
          <animated.div style={gameOver ? opacityOn : opacityOff}>
            <h1 className="text-4xl font-bold text-gray-100">
              {!turn ? "Player X won" : "Player Y won"}
            </h1>
            <button
              className="w-48 font-bold rounded customButton text-2xl py-2 px-4 mt-5"
              onClick={resetTable}
            >
              Reset
            </button>
          </animated.div>
        )}
      </div>
    </div>
  );
};

export default App;
