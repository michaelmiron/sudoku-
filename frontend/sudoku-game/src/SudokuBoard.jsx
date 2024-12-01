import React, { useState } from 'react';
import './SudokuBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SudokuBoard = () => {
    const generateBoard = () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill(''));

        const isValidPlacement = (board, row, col, num) => {
            for (let j = 0; j < 9; j++) if (board[row][j] === num) return false;
            for (let i = 0; i < 9; i++) if (board[i][col] === num) return false;

            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[startRow + i][startCol + j] === num) return false;
                }
            }
            return true;
        };

        const fillRandomCells = (board) => {
            let filledCells = 0;
            while (filledCells < 10) {
                const row = Math.floor(Math.random() * 9);
                const col = Math.floor(Math.random() * 9);
                if (board[row][col] === '') {
                    const num = Math.floor(Math.random() * 9) + 1;
                    if (isValidPlacement(board, row, col, String(num))) {
                        board[row][col] = String(num);
                        filledCells++;
                    }
                }
            }
        };

        fillRandomCells(board);
        return board;
    };

    const [initialBoard, setInitialBoard] = useState(generateBoard()); // שמירת הלוח המקורי
    const [board, setBoard] = useState(initialBoard.map((row) => [...row])); // העתקת הלוח הנוכחי

    const isValidPlacement = (board, row, col, num) => {
        for (let j = 0; j < 9; j++) if (board[row][j] === num) return false;
        for (let i = 0; i < 9; i++) if (board[i][col] === num) return false;

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    };

    const findNextCell = (board) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '') return [row, col];
            }
        }
        return null; // אין תאים ריקים
    };

    const solveStep = () => {
        const nextCell = findNextCell(board);

        if (!nextCell) {
            alert('The board is already solved or has no empty cells!');
            return;
        }

        const [row, col] = nextCell;

        for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(board, row, col, String(num))) {
                setBoard((prevBoard) => {
                    const newBoard = prevBoard.map((rowArr, rowIndex) =>
                        rowArr.map((cell, colIndex) =>
                            rowIndex === row && colIndex === col ? String(num) : cell
                        )
                    );
                    return newBoard;
                });
                return;
            }
        }

        alert('No valid number found for this cell. Please check the board or reset it.');
    };

    const resetBoard = () => {
        const newBoard = generateBoard();
        setInitialBoard(newBoard); // יצירת לוח חדש עם מספרים רנדומליים
        setBoard(newBoard.map((row) => [...row])); // עדכון הלוח הנוכחי
    };

    const handleInputChange = (row, col, value) => {
        if (value === '' || /^[1-9]$/.test(value)) {
            setBoard((prevBoard) => {
                const newBoard = prevBoard.map((rowArr, rowIndex) =>
                    rowArr.map((cell, colIndex) =>
                        rowIndex === row && colIndex === col ? value : cell
                    )
                );
                return newBoard;
            });
        }
    };

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
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="sudoku-row">
                            {row.map((cell, colIndex) => (
                                <div key={colIndex} className="sudoku-cell">
                                    <input
                                        type="text"
                                        maxLength="1"
                                        className="cell-input"
                                        value={cell}
                                        onChange={(e) =>
                                            handleInputChange(
                                                rowIndex,
                                                colIndex,
                                                e.target.value
                                            )
                                        }
                                        disabled={initialBoard[rowIndex][colIndex] !== ''} // תאים רנדומליים נעולים
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-container mt-4">
                <button className="btn btn-lg btn-success" onClick={resetBoard}>
                    Reset Board
                </button>
                <button className="btn btn-lg btn-primary" onClick={solveStep}>
                    Solve Step
                </button>
            </div>
            <footer className="footer mt-5">
                <p className="text-muted">© 2024 Sudoku Pro | By Michael Miron and Eli Alhazov :)</p>
            </footer>
        </div>
    );
};

export default SudokuBoard;








