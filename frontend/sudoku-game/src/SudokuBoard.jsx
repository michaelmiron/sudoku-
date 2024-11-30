import React, { useState } from 'react';
import './SudokuBoard.css';

const SudokuBoard = () => {
    // Generate an initial Sudoku board
    const generateBoard = () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill(''));
        // Randomly fill some cells with numbers (1-9)
        for (let i = 0; i < 10; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            const num = Math.floor(Math.random() * 9) + 1;
            board[row][col] = num;
        }
        return board;
    };

    const [board, setBoard] = useState(generateBoard);

    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="sudoku-cell">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SudokuBoard;
