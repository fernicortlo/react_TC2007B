// PostFilterSidebar.test.js

// import React from 'react';
// import { render } from '@testing-library/react';
// import { PostFilterSidebar } from './posts.tsx'; // Adjust the import path

// describe('PostFilterSidebar', () => {
//   it('should render the PostFilterSidebar component', () => {
//     const { getByText } = render(<PostFilterSidebar />);
    
//     // Use getByText or other queries to find elements in the rendered component
//     const categoryLabel = getByText('Category');
//     const idLabel = getByText('ID');
//     const usersLabel = getByText('Users');
//     const titleLabel = getByText('title');
//     const bodyLabel = getByText('Body');
    
//     // Assert that the elements are present in the rendered component
//     expect(categoryLabel).toBeInTheDocument();
//     expect(idLabel).toBeInTheDocument();
//     expect(usersLabel).toBeInTheDocument();
//     expect(titleLabel).toBeInTheDocument();
//     expect(bodyLabel).toBeInTheDocument();
//   });
// });

// import React from 'react';
// import { render } from '@testing-library/react';
// import { PostFilterSidebar } from './posts'; 

// describe('PostFilterSidebar', () => {
//   describe('Labels', () => {
//     it('should render necessary labels', () => {
//       const { getByText } = render(<PostFilterSidebar />);
      
//       expect(getByText('Category')).toBeInTheDocument();
//       expect(getByText('ID')).toBeInTheDocument();
//       expect(getByText('Users')).toBeInTheDocument();
//       expect(getByText('title')).toBeInTheDocument();
//       expect(getByText('Body')).toBeInTheDocument();
//     });
//   });

// });

import React from 'react';
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
