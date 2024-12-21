import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import Timer from '../src/components/Timer';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
});

describe('Timer Component', () => {
    test('displays initial time as 00:00', () => {
        render(<Timer reset={false} />);
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    test('increments timer after 1 second', () => {
        render(<Timer reset={false} />);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('00:01')).toBeInTheDocument();
    });

    test('pauses and resumes the timer', () => {
        render(<Timer reset={false} />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(screen.getByText('00:03')).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Pause/i));

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByText('00:03')).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Resume/i));

        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByText('00:05')).toBeInTheDocument();
    });

    test('resets timer when reset button is clicked', () => {
        render(<Timer reset={false} />);

        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(screen.getByText('00:05')).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Reset/i));

        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    test('resets timer when reset prop changes', () => {
        const { rerender } = render(<Timer reset={false} />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(screen.getByText('00:03')).toBeInTheDocument();

        rerender(<Timer reset={true} />);
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });
});
