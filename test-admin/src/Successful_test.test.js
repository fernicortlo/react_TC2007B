import {render, fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import posts from './posts'; // our fake data

const Button=({onClick,children})=>{
    <button onClick={onClick}>{children}</button>
}

jest.mock('react-admin',() => ({
    ...jest.requireActual('react-admin'),
    create: ()=> jest.fn(),
    useNotify: () => jest.fn(),
    useRefresh: () => jest.fn(),
    useRedirect: () => jest.fn()
}));

describe('PostCreate', () => {
    test('Should render save button');
    const button = screen.getByRole('button', {name: /save/i});
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
});

describe('PostCreate', () => {
    test('Should render success message');
    });
test('should render success message', () => {
    const{handleClick}= jest.fn();
    render(<Button onClick={handleClick}>save</Button>)
    fireEvent.click(screen.getByText(/save/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
});
