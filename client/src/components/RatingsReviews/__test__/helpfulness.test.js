/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import {cleanup, render, screen} from '@testing-library/react';
 import IndividualReviewHelpfulness from '../IndividualReviewHelpfulness.jsx';
 import "@testing-library/jest-dom";

 afterEach(cleanup);

test('IndividualReviewHelpfulness should render', () => {
  render(<IndividualReviewHelpfulness
    review={{review_id: 456}}
  />);

  const helpfulnessEl = screen.getByTestId('helpfulness');
  expect(helpfulnessEl).toBeInTheDocument();
});


test('IndividualReviewHelpfulness should include 10 in the text content', () => {
  render(<IndividualReviewHelpfulness
    review={{review_id: 456, helpfulness: 10}}
  />);

  const helpfulnessEl = screen.getByTestId('helpfulness');
  expect(helpfulnessEl).toHaveTextContent('10')
});