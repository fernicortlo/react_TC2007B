import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
}

describe('Button Component', () => {
    test('Should render save button', () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole('button', { name: /save/i });
        expect(button).toBeInTheDocument();
    });

    test('should trigger click handler', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>save</Button>)
        fireEvent.click(screen.getByText(/save/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    describe('Button Component', () => {
        test('Should render save button', () => {
            render(<Button>Save</Button>);
            const button = screen.getByRole('button', { name: /save/i });
            expect(button).toBeInTheDocument();
        });
    
        test('Should render cancel button', () => {
            render(<Button>Cancel</Button>);
            const button = screen.getByRole('button', { name: /cancel/i });
            expect(button).toBeInTheDocument();
        });
    
        test('Should render custom label', () => {
            render(<Button>Custom Label</Button>);
            const button = screen.getByText(/custom label/i);
            expect(button).toBeInTheDocument();
        });
    
        test('Should trigger click handler', () => {
            const handleClick = jest.fn();
            render(<Button onClick={handleClick}>Save</Button>);
            fireEvent.click(screen.getByText(/save/i));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    
    });
    
});
