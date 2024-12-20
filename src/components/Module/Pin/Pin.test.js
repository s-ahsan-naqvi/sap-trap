import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Module/Pin from './Module/Pin';

describe('<Module/Pin />', () => {
  test('it should mount', () => {
    render(<Module/Pin />);
    
    const modulePin = screen.getByTestId('Module/Pin');

    expect(modulePin).toBeInTheDocument();
  });
});