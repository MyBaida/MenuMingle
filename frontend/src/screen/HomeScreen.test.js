import { act, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listMenuItems } from '../actions/menuItemActions';
import { listCategories } from '../actions/categoryActions';
import HomeScreen from './HomeScreen';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../actions/menuItemActions', () => ({
  listMenuItems: jest.fn(() => ({ type: 'LIST_MENU_ITEMS' })),
}));

jest.mock('../actions/categoryActions', () => ({
  listCategories: jest.fn(() => ({ type: 'LIST_CATEGORIES' })),
}));

jest.mock('../components/Header', () => () => null);
jest.mock('../components/SquareCard', () => () => null);
jest.mock('../components/RoundCard', () => () => null);
jest.mock('../components/Footer', () => () => null);
jest.mock('../components/Cat', () => () => null);
jest.mock('../components/MobileOrderBar', () => () => null);

const originalFetch = global.fetch;
const dispatch = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(dispatch);
  useParams.mockReturnValue({ id: '1' });
  useSelector.mockImplementation((selector) =>
    selector({
      menuItemList: { loading: false, menuItems: [] },
      categoryList: { categories: [] },
    })
  );
  global.fetch = jest.fn();
  dispatch.mockClear();
  listMenuItems.mockClear();
  listCategories.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
  global.fetch = originalFetch;
});

test('shows a waking state until the table lookup succeeds', async () => {
  let resolveFetch;
  global.fetch.mockReturnValue(
    new Promise((resolve) => {
      resolveFetch = resolve;
    })
  );

  render(<HomeScreen />);

  expect(screen.getByText('Waking up the menu...')).toBeInTheDocument();
  expect(screen.queryByText('Table not found')).not.toBeInTheDocument();

  await act(async () => {
    resolveFetch({
      ok: true,
      json: async () => [],
    });
  });

  expect(screen.getByText('Table not found')).toBeInTheDocument();
});

test('retries a failed table lookup and loads the menu when the backend responds', async () => {
  jest.useFakeTimers();
  global.fetch
    .mockRejectedValueOnce(new Error('Backend is waking up'))
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ _id: 1, name: 'AB6' }],
    });

  render(<HomeScreen />);

  await act(async () => {
    await Promise.resolve();
  });
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Waking up the menu...')).toBeInTheDocument();

  await act(async () => {
    jest.advanceTimersByTime(5000);
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(screen.getByText('AB6')).toBeInTheDocument();
  expect(screen.queryByText('Table not found')).not.toBeInTheDocument();
  expect(listMenuItems).toHaveBeenCalled();
  expect(listCategories).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledTimes(2);
});
