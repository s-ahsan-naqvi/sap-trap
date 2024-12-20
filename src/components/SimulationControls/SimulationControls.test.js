import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimulationControls from './SimulationControls';

describe('<SimulationControls />', () => {
  test('it should mount', () => {
    render(<SimulationControls />);
    
    const simulationControls = screen.getByTestId('SimulationControls');

    expect(simulationControls).toBeInTheDocument();
  });
});