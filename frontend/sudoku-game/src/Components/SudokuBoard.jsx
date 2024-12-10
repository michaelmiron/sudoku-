import React, { useState } from 'react';
import '../Styles/SudokuBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SudokuCell from './sudokuCell.jsx';
import ResetBoard from './ResetBoard.jsx';
import SolveStepButton from './SolveStepButton.jsx';
import Timer from './Timer.jsx';
import '../Styles/ResetBoard.css';
import '../Styles/SolveStepButton.css';
import '../Styles/Timer.css';
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


    const { board: initialBoard, emptyCells: initialEmptyCells } = generateBoard();
    const [board, setBoard] = useState(initialBoard);
    const [emptyCells, setEmptyCells] = useState(initialEmptyCells);
    const [resetTimer, setResetTimer] = useState(false);
    const [backendError, setBackendError] = useState('');
    const [comingSoonMessage, setComingSoonMessage] = useState('');


    const handleResetBoard = () => {
        const { board, emptyCells } = generateBoard();
        setBoard(board);
        setEmptyCells(emptyCells);
        setResetTimer((prev) => !prev);
        setBackendError('');
        setComingSoonMessage('');
    };


    const updateBoard = async (row, col, num) => {
        const newBoard = board.map((rowArr, rowIndex) =>
            rowArr.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? num : cell
            )
        );

        setBoard(newBoard);
        setEmptyCells((prevEmptyCells) =>
            prevEmptyCells.filter(([r, c]) => !(r === row && c === col))
        );


        try {
            const params = new URLSearchParams();
            newBoard.forEach((row, rowIndex) => {
                const formattedRow = row.map(cell => (cell === '' ? '0' : cell)).join(',');
                console.log(`Row ${rowIndex + 1}:`, formattedRow);
                params.append('board', formattedRow);
            });

            const requestUrl = `http://127.0.0.1:8000/check_board/validate/?${params}`;
            console.log('Request URL:', requestUrl);

            const response = await fetch(requestUrl);
            const data = await response.json();

            console.log('Response from backend:', data);

            if (!data.valid) {
                setBackendError(`Error: ${data.error}`);
            } else {
                setBackendError('');
            }
        } catch (error) {
            console.error('Error validating board:', error);
            setBackendError('Error communicating with the backend.');
        }
    };




    const simulateBackendError = () => {
        setBackendError('This is a simulated backend error message!');
        setComingSoonMessage('Coming Soon');
    };

    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className="custom-title mb-4">🎲 Welcome to Sudoku Pro 🎲</h1>
                <p className="lead text-secondary">
                    Solve Sudoku step-by-step or reset the board.
                </p>
            </div>

            <div className="sudoku-timer-container">
                <div className="timer-container">
                    <button
                        className="btn btn-danger simulate-error-button"
                        onClick={simulateBackendError}
                    >
                        Simulate Backend Error
                    </button>
                    <Timer reset={resetTimer} />

                    {comingSoonMessage && (
                        <div className="alert alert-info text-center coming-soon-alert" role="alert">
                            <strong>{comingSoonMessage}</strong>
                        </div>
                    )}
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
                                    handleInputChange={updateBoard}
                                />
                            ))
                        )}
                    </div>


                    {backendError && (
                        <div className="alert alert-danger mt-3">
                            {backendError}
                        </div>
                    )}
                </div>
            </div>

            <div className="button-container mt-4">
                <ResetBoard
                    setInitialBoard={handleResetBoard}
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
            </div>

            <footer className="footer mt-5">
                <p className="text-muted">© 2024 Sudoku Pro | By Michael Miron and Eli Alhazov :)</p>
            </footer>
        </div>
    );

};

export default SudokuBoard;
