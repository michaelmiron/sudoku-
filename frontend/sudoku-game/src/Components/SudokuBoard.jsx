import React, { useState } from 'react';
import '../Styles/SudokuBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SudokuCell from './sudokuCell.jsx';
import ResetBoard from './ResetBoard.jsx';
import SolveStepButton from './SolveStepButton.jsx';
import '../Styles/ResetBoard.css';
import '../Styles/SolveStepButton.css';




const SudokuBoard = () => {
    const generateBoard = () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill(''));
        fillRandomCells(board);
        return board;
    };

    const isInRowOrCol = (board, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return true;
        }
        return false;
    };

    const isInSubGrid = (board, row, col, num) => {
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return true;
            }
        }
        return false;
    };

    const isValidPlacement = (board, row, col, num) => {
        return !isInRowOrCol(board, row, col, num) && !isInSubGrid(board, row, col, num);
    };

    const fillRandomCells = (board) => {
        let filledCells = 0;
        while (filledCells < 10) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            const num = Math.floor(Math.random() * 9) + 1;
            if (board[row][col] === '' && isValidPlacement(board, row, col, String(num))) {
                board[row][col] = String(num);
                filledCells++;
            }
        }
    };

    const findNextCell = (board) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '') return [row, col];
            }
        }
        return null;
    };

    const [initialBoard, setInitialBoard] = useState(generateBoard());
    const [board, setBoard] = useState(initialBoard.map((row) => [...row]));

    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className="custom-title mb-4">🎲 Welcome to Sudoku Pro 🎲</h1>
                <p className="lead text-secondary">
                    Solve Sudoku step-by-step or reset the board.
                </p>
            </div>
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
                    setInitialBoard={setInitialBoard}
                    setBoard={setBoard}
                    generateBoard={generateBoard}
                />
                <SolveStepButton
                    board={board}
                    setBoard={setBoard}
                    findNextCell={findNextCell}
                    isValidPlacement={isValidPlacement}
                />
            </div>
            <footer className="footer mt-5">
                <p className="text-muted">© 2024 Sudoku Pro | By Michael Miron and Eli Alhazov :)</p>
            </footer>
        </div>
    );
};

export default SudokuBoard;
