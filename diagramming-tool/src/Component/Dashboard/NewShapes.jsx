import React from 'react';

const shapeSize = { width: 80, height: 80 };

const Shape = ({ className, children }) => (
  <svg className={`shape ${className}`} width={shapeSize.width} height={shapeSize.height}>
    {children}
  </svg>
);

const CommonShape = ({ className, children }) => (
  <Shape className={className}>
    {children}
  </Shape>
);

export const Rectangle = () => (
  <CommonShape className="rectangle">
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 40} stroke="black" strokeWidth="2" fill="white" />
  </CommonShape>
);

export const Circle = () => (
  <CommonShape className="circle">
    <circle cx={shapeSize.width / 2} cy={shapeSize.height / 2} r={(shapeSize.width - 20) / 2} stroke="black" strokeWidth="2" fill="white" />
  </CommonShape>
);

export const Square = () => (
  <CommonShape className="square">
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 20} stroke="black" strokeWidth="2" fill="white" />
  </CommonShape>
);

export const Diamond = () => (
  <CommonShape className="diamond">
    <polygon points={`${shapeSize.width / 2},${10} ${shapeSize.width - 10},${shapeSize.height / 2} ${shapeSize.width / 2},${shapeSize.height - 10} ${10},${shapeSize.height / 2}`} stroke="black" strokeWidth="2" fill="white" />
  </CommonShape>
);

