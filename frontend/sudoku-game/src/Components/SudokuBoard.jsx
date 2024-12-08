import React, { useState } from 'react';
import '../Styles/SudokuBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SudokuCell from './sudokuCell.jsx';
import ResetBoard from './ResetBoard.jsx';
import SolveStepButton from './SolveStepButton.jsx';
import '../Styles/ResetBoard.css';
import '../Styles/SolveStepButton.css';
import ErrorHandlingInterface from "./ErrorHandlingInterface.jsx";

const SudokuBoard = () => {
    const generateBoard = () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill(''));
        const emptyCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                emptyCells.push([row, col]);
            }
        }
        fillRandomCells(board, emptyCells);
        return { board, emptyCells };
    };

    const isValidPlacement = (board, row, col, num) => {
        const isInRowOrCol = (board[row].includes(num) || board.some(rowArr => rowArr[col] === num));
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        const isInSubGrid = board
            .slice(startRow, startRow + 3)
            .some(subRow => subRow.slice(startCol, startCol + 3).includes(num));

        return !isInRowOrCol && !isInSubGrid;
    };

    const fillRandomCells = (board, emptyCells) => {
        let filledCells = 0;
        while (filledCells <= 9 && emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const [row, col] = emptyCells[randomIndex];
            const num = Math.floor(Math.random() * 9) + 1;

            if (isValidPlacement(board, row, col, String(num))) {
                board[row][col] = String(num);
                emptyCells.splice(randomIndex, 1);
                filledCells++;
            }
        }
    };

    const findNextCell = (emptyCells) => {
        return emptyCells.length > 0 ? emptyCells[0] : null;
    };

    const updateBoard = (row, col, num) => {
        setBoard((prevBoard) =>
            prevBoard.map((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) =>
                    rowIndex === row && colIndex === col ? num : cell
                )
            )
        );
        setEmptyCells((prevEmptyCells) =>
            prevEmptyCells.filter(([r, c]) => !(r === row && c === col))
        );
    };

    // Test function to simulate backend error
    const simulateBackendError = () => {
        setBackendError('This is a simulated backend error message!');
    };

    const { board: initialBoard, emptyCells: initialEmptyCells } = generateBoard();
    const [board, setBoard] = useState(initialBoard);
    const [emptyCells, setEmptyCells] = useState(initialEmptyCells);
    const [backendError, setBackendError] = useState(''); // Add state for backend errors

    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className="custom-title mb-4">🎲 Welcome to Sudoku Pro 🎲</h1>
                <p className="lead text-secondary">
                    Solve Sudoku step-by-step or reset the board.
                </p>
            </div>
            {/* Add ErrorHandlingInterface here */}
            <ErrorHandlingInterface errorMessage={backendError} />
            <div className="sudoku-container">
                <div className="sudoku-board">
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <SudokuCell
                                key={`${rowIndex}-${colIndex}`}
                                cell={cell}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="button-container mt-4">
                <ResetBoard
                    setInitialBoard={() => {
                        const { board, emptyCells } = generateBoard();
                        setBoard(board);
                        setEmptyCells(emptyCells);
                    }}
                    setBoard={setBoard}
                    generateBoard={generateBoard}
                />
                <SolveStepButton
                    board={board}
                    setBoard={updateBoard}
                    findNextCell={() => findNextCell(emptyCells)}
                    isValidPlacement={isValidPlacement}
                    setEmptyCells={setEmptyCells}
                />
                {/* Button to test error message */}
                <button
                    className="btn btn-danger mt-3"
                    onClick={simulateBackendError}
                >
                    Simulate Backend Error
                </button>
            </div>
            <footer className="footer mt-5">
                <p className="text-muted">© 2024 Sudoku Pro | By Michael Miron and Eli Alhazov :)</p>
            </footer>
        </div>
    );
};

export default SudokuBoard;
