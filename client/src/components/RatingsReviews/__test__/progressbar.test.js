/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import {cleanup, render, screen} from '@testing-library/react';
 import Progressbar from '../Progressbar.jsx';
 import "@testing-library/jest-dom";

 afterEach(cleanup);

test('progressbar should render', () => {
  render(<Progressbar
    bgcolor='rgb(22 208 83)'
    min={5}
    max={100}
    height={10}
    width={70}
    showBar='true'
  />);

  const progressbarEl = screen.getByTestId('progressbar');
  expect(progressbarEl).toBeInTheDocument();
});
