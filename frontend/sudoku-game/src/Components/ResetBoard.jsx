import React from 'react';

const ResetBoard = ({ setInitialBoard, setBoard, generateBoard }) => {
    const resetBoard = () => {
        const newBoard = generateBoard();
        setInitialBoard(newBoard); // עדכון הסטייט של הלוח המקורי
        setBoard(newBoard.map((row) => [...row])); // עדכון הסטייט של הלוח הנוכחי
    };

    return (
        <button className="reset-button" onClick={resetBoard}>
            Reset Board
        </button>
    );
};

export default ResetBoard;
