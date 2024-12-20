import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConBar from './ConBar';

describe('<ConBar />', () => {
  xtest('it should mount', () => {
    render(<ConBar />);
    
    const conBar = screen.getByTestId('ConBar');

    expect(conBar).toBeInTheDocument();
  });
});