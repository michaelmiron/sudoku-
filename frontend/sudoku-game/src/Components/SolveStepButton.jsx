import React from 'react';

const SolveStepButton = ({ board, setBoard, findNextCell, isValidPlacement, setEmptyCells }) => {
    const solveStep = async () => {
        const nextCell = findNextCell();

        if (!nextCell) {
            // אם אין עוד תאים ריקים, נשתמש במודל CNN לפתרון מלא
            try {
                const response = await fetch('/check_board/solve_sudoku/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ board }),
                });

                if (!response.ok) {
                    throw new Error('Error solving the board!');
                }

                const data = await response.json();

                if (data.solution) {
                    setBoard(data.solution); // עדכון הלוח לפתרון המלא שהתקבל מהמודל
                    alert('The Sudoku board has been solved!');
                } else {
                    alert('Failed to solve the board. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while solving the board.');
            }
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
