import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Module from './Module';

describe('<Module />', () => {
  test('it should mount', () => {
    render(<Module />);
    
    const module = screen.getByTestId('Module');

    expect(module).toBeInTheDocument();
  });
});