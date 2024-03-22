// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// setupTests.js
import '@testing-library/jest-dom';
class IntersectionObserver {
    constructor() {}
  
    observe() {
      // do nothing
    }
  
    disconnect() {
      // do nothing
    }
  }
  
  global.IntersectionObserver = IntersectionObserver;
  

// import '@testing-library/jest-dom/extend-expect';



