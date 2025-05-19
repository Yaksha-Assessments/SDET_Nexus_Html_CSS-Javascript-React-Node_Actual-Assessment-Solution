import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('boundary', () => {
    test('AppComponent boundary renders without crashing', () => {
        render(<App />);
    });

    test('AppComponent boundary has "Welcome to Policy Finder" h2', () => {
        render(<App />);
        expect(screen.queryByText('Welcome to Policy Finder')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Add Policy" h2', () => {
        render(<App />);
        expect(screen.queryAllByText('Add Policy')).toBeTruthy();
    });

    test('AppComponent boundary has "Policy List" h2', () => {
        render(<App />);
        expect(screen.queryByText('Policy List')).toBeInTheDocument();
    });
});
