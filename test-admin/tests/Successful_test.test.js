import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import posts from '../src/posts'; 

const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
}

jest.mock('react-admin',() => ({
    ...jest.requireActual('react-admin'),
    create: ()=> jest.fn(),
    useNotify: () => jest.fn(),
    useRefresh: () => jest.fn(),
    useRedirect: () => jest.fn()
}));

describe('PostCreate', () => {
    test('Should render save button', () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole('button', { name: /save/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
    });
});