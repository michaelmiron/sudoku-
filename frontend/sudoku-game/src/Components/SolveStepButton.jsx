import React from 'react';

const SolveStepButton = ({ board, setBoard, findNextCell, isValidPlacement, setEmptyCells }) => {
    const solveStep = () => {
        const nextCell = findNextCell();
        if (!nextCell) {
            alert('The board is already solved or no empty cells are left!');
            return;
        }

        const [row, col] = nextCell;


        for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(board, row, col, String(num))) {
                setBoard(row, col, String(num));
                setEmptyCells((prevEmptyCells) =>
                    prevEmptyCells.filter(([r, c]) => !(r === row && c === col))
                );
                return;
            }
        }

        alert('No valid numbers can be placed in the remaining cells!');
    };

    return (
        <button className="btn btn-lg btn-primary" onClick={solveStep}>
            Solve Step
        </button>
    );
};

export default SolveStepButton;
