import '@testing-library/jest-dom';
import 'jsdom-global/register';
import 'jest-canvas-mock';

import 'text-encoding-polyfill'; 

class IntersectionObserver {
  constructor() { }
  observe() {
  }
  disconnect() {
  }
}
global.IntersectionObserver = IntersectionObserver;







