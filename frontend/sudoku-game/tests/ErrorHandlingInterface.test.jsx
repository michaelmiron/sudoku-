import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import ErrorHandlingInterface from '../src/components/ErrorHandlingInterface';

describe('ErrorHandlingInterface Component', () => {
    test('displays the error message when provided', () => {
        const errorMessage = 'An error occurred!';
        render(<ErrorHandlingInterface errorMessage={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toHaveClass('error-message');
    });

    test('does not display anything when no error message is provided', () => {
        render(<ErrorHandlingInterface errorMessage={null} />);


        expect(screen.queryByRole('alert')).toBeNull();
        expect(screen.queryByText(/An error occurred!/i)).toBeNull();
    });

    test('adds the "show" class to the container when there is an error message', () => {
        const errorMessage = 'Another error occurred!';
        render(<ErrorHandlingInterface errorMessage={errorMessage} />);

        const container = screen.getByText(errorMessage).closest('.error-container');
        expect(container).toHaveClass('show');
    });

    test('does not add the "show" class to the container when there is no error message', () => {
        render(<ErrorHandlingInterface errorMessage={null} />);

        const container = document.querySelector('.error-container');
        expect(container).not.toHaveClass('show');
    });
});
