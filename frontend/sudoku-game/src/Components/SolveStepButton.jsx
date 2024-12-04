import React from 'react';

const SolveStepButton = ({ board, setBoard, findNextCell, isValidPlacement }) => {
    const solveStep = () => {
        console.log('Current Board:', board);

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
                    console.log(`Placed ${num} at [${row}, ${col}]`);
                    console.log('Updated Board:', newBoard);
                    return newBoard;
                });
                return;
            }
        }

        alert('No valid number found for this cell. Please check the board or reset it.');
    };

    return (
        <button className="btn btn-lg btn-primary" onClick={solveStep}>
            Solve Step
        </button>
    );
};

export default SolveStepButton;
