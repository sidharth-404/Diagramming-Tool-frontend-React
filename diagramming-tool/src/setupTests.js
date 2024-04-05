import '@testing-library/jest-dom';
import 'jsdom-global/register';



import 'jest-canvas-mock';
class IntersectionObserver {
    constructor() {}
     observe() {    
    }
    disconnect() {
    }
  }
  global.IntersectionObserver = IntersectionObserver;
  




