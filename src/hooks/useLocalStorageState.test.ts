import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorageState } from './useLocalStorageState';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('the useLocalStorageState hook', () => {
  beforeEach(window.localStorage.clear);

  it('should return initialState when nothing is stored in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorageState({ key: 'test-key', initialState: 'initialValue' }),
    );
    expect(result.current[0]).toBe('initialValue');
  });

  it('should return the value from localStorage when it exists', () => {
    window.localStorage.setItem('test-key', '"localStorageValue"');
    const { result } = renderHook(() =>
      useLocalStorageState({ key: 'test-key', initialState: 'initialValue' }),
    );
    expect(result.current[0]).toBe('localStorageValue');
  });

  it('should set a value in localStorage when the state is updated', () => {
    const { result } = renderHook(() =>
      useLocalStorageState({ key: 'test-key', initialState: 'initialValue' }),
    );
    act(() => {
      result.current[1]('test-value');
    });
    expect(window.localStorage.getItem('test-key')).toBe('"test-value"');
  });
});
