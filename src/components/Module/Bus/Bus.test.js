import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bus from './Module/Bus';

describe('<Module/Bus />', () => {
  test('it should mount', () => {
    render(<Bus />);
    
    const moduleBus = screen.getByTestId('Module/Bus');

    expect(moduleBus).toBeInTheDocument();
  });
});