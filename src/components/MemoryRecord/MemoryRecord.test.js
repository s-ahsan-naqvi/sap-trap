import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemoryRecord from './MemoryRecord';

describe('<MemoryRecord />', () => {
  test('it should mount', () => {
    render(<MemoryRecord />);
    
    const memoryRecord = screen.getByTestId('MemoryRecord');

    expect(memoryRecord).toBeInTheDocument();
  });
});