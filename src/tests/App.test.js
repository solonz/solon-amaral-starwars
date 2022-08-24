import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';

describe('test full use of application', () => {
  test('if name filter is working', async () => {
  render(<PlanetsProvider><App /></PlanetsProvider>);
  const nameFilter = screen.getByTestId("name-filter");
  userEvent.type(nameFilter, "tato")
  await waitFor(() => expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument());
})
  test('if all filters options are rendering and working', async () => {
  render(<PlanetsProvider><App /></PlanetsProvider>);
  const nameFilter = screen.getByTestId("name-filter");
  expect(nameFilter).toBeInTheDocument()
  const columnFilter = screen.getByTestId("column-filter")
  expect(columnFilter).toBeInTheDocument()
  const comparisonFilter = screen.getByTestId("comparison-filter")
  expect(comparisonFilter).toBeInTheDocument()
  const valueFilter = screen.getByTestId("value-filter")
  expect(valueFilter).toBeInTheDocument()
  const buttonFilter = screen.getByTestId("button-filter")
  expect(buttonFilter).toBeInTheDocument()
  userEvent.selectOptions(columnFilter, ['diameter'])
  userEvent.selectOptions(comparisonFilter, ['maior que'])
  userEvent.type(valueFilter, '100000')
  userEvent.click(buttonFilter)
  await waitFor(() => expect(screen.getByRole('cell', {  name: /bespin/i})).toBeInTheDocument());
  const deleteFilter = screen.getByTestId("delete-filter");
  expect(deleteFilter).toBeInTheDocument()
  userEvent.click(deleteFilter)
  await waitFor(() => expect(screen.getByRole('cell', {  name: /hoth/i})).toBeInTheDocument());
  userEvent.selectOptions(columnFilter, ['diameter'])
  userEvent.selectOptions(comparisonFilter, ['menor que'])
  userEvent.type(valueFilter, '5000')
  userEvent.click(buttonFilter)
  await waitFor(() => expect(screen.getByRole('cell', {  name: /endor/i})).toBeInTheDocument());
  const resetFilters = screen.getByTestId("button-remove-filters")
  expect(resetFilters).toBeInTheDocument()
  userEvent.click(resetFilters)
  await waitFor(() => expect(screen.getByRole('cell', {  name: /yavin/i})).toBeInTheDocument());
  userEvent.selectOptions(columnFilter, ['surface_water'])
  userEvent.selectOptions(comparisonFilter, ['igual a'])
  userEvent.type(valueFilter, '1')
  userEvent.click(buttonFilter)
  await waitFor(() => expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument());
})
});
