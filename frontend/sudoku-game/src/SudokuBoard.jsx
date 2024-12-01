import React, {isValidElement, useState} from 'react';
import './SudokuBoard.css';

const SudokuBoard = () => {
    // Generate an initial Sudoku board
    const generateBoard = () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill(''));

        const isValidPlacement = (board,row,col,num)=>{
            //check rows
            for (let j = 0; j < 9; j++) {
                if (board[row][j] === num) {
                    return false;
                }
            }
            //check cols
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === num) {
                    return false;
                }
            }
            const startRow =Math.floor(row/3)*3;
            const startCol =Math.floor(col/3)*3;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[startRow+i][startCol+j] === num) {
                        return false;
                    }
                }
            }
            return true;
        };
        //Function to randomly fill some cells with valid numbers
        const fillBoard = (board) => {
            let filledCells = 0;

            while (filledCells <= 9) {
                const row = Math.floor(Math.random() * 9);
                const col = Math.floor(Math.random() * 9);

                if (board[row][col] === '') {
                    // Try placing a random number (1-9)
                    const num = Math.floor(Math.random() * 9) + 1;

                    // Place only if it doesn't violate Sudoku rules
                    if (isValidPlacement(board, row, col, num)) {
                        board[row][col] = num;
                        filledCells++;
                    }
                }
            }
        };

        fillBoard(board);
        return board;
    };
    const [board, setBoard] = useState(generateBoard());

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
