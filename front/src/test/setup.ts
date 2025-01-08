import '@testing-library/jest-dom';
import { APIServer } from './mocks/server';
import { vi } from 'vitest';

beforeAll(() => APIServer.listen());
afterAll(() => APIServer.close());
afterEach(() => APIServer.resetHandlers());
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
