// PostFilterSidebar.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { PostFilterSidebar } from './posts.tsx'; // Adjust the import path

describe('PostFilterSidebar', () => {
  it('should render the PostFilterSidebar component', () => {
    const { getByText } = render(<PostFilterSidebar />);
    
    // Use getByText or other queries to find elements in the rendered component
    const categoryLabel = getByText('Category');
    const idLabel = getByText('ID');
    const usersLabel = getByText('Users');
    const titleLabel = getByText('title');
    const bodyLabel = getByText('Body');
    
    // Assert that the elements are present in the rendered component
    expect(categoryLabel).toBeInTheDocument();
    expect(idLabel).toBeInTheDocument();
    expect(usersLabel).toBeInTheDocument();
    expect(titleLabel).toBeInTheDocument();
    expect(bodyLabel).toBeInTheDocument();
  });
});
