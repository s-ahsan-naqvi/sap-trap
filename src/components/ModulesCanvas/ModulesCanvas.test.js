import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModulesCanvas from './ModulesCanvas';

describe('<ModulesCanvas />', () => {
  test('it should mount', () => {
    render(<ModulesCanvas />);
    
    const modulesCanvas = screen.getByTestId('ModulesCanvas');

    expect(modulesCanvas).toBeInTheDocument();
  });
});