import React from 'react';


const ResetBoard = ({ setInitialBoard, setBoard, generateBoard }) => {
    const resetBoard = () => {
        const newBoard = generateBoard();
        setInitialBoard(newBoard);
        setBoard(newBoard.map((row) => [...row]));
    };

    return (
        <button className="reset-button" onClick={resetBoard}>
            Reset Board
        </button>
    );
};

export default ResetBoard;
