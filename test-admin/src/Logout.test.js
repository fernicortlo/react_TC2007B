/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyLayout, { MyLogoutButton } from './MyLayout'; // Replace with the actual import path

module.exports = {
    testEnvironment: 'jsdom',
  };
// Mock the react-admin module and the useLogout function
jest.mock('react-admin', () => ({
  ...jest.requireActual('react-admin'),
  useLogout: jest.fn(),
}));

// test('Logout button triggers logout action', () => {
//   const { getByText } = render(<MyLogoutButton />);

//   // Simulate a click on the logout button
//   fireEvent.click(getByText('Logout'));

//   // Assert that the useLogout function was called
//   expect(require('react-admin').useLogout).toHaveBeenCalled();
// });

test('Logout button triggers logout action', () => {
  const{handleClick}= jest.fn();
  const { getByText } = render(<MyLogoutButton onClick={handleClick}>Logout</MyLogoutButton>)
  fireEvent.click(getByText('Logout'))
  expect(require('react-admin').useLogout).toHaveBeenCalledTimes(1)
});


