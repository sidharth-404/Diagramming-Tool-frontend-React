import React from "react";

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
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 40} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const RoundedRectangle = () => (
  <CommonShape className="rounded-rectangle">
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 40} rx="10" ry="10" stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Square = () => (
  <CommonShape className="square">
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 20} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Circle = () => (
  <CommonShape className="circle">
    <circle cx={shapeSize.width / 2} cy={shapeSize.height / 2} r={(shapeSize.width - 20) / 2} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Ellipse = () => (
  <CommonShape className="ellipse">
    <ellipse cx={shapeSize.width / 2} cy={shapeSize.height / 2} rx={(shapeSize.width - 20) / 2} ry={(shapeSize.height - 40) / 2} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Diamond = () => (
  <CommonShape className="diamond">
    <polygon points={`${shapeSize.width / 2},${10} ${shapeSize.width - 10},${shapeSize.height / 2} ${shapeSize.width / 2},${shapeSize.height - 10} ${10},${shapeSize.height / 2}`} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Parallelogram = () => (
  <CommonShape className="parallelogram">
    <polygon points={`${10},${10} ${shapeSize.width - 30},${10} ${shapeSize.width - 10},${shapeSize.height - 10} ${30},${shapeSize.height - 10}`} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Hexagon = () => (
  <CommonShape className="hexagon">
    <polygon points={`${shapeSize.width / 4},${10} ${shapeSize.width * 0.75},${10} ${shapeSize.width - 10},${shapeSize.height / 2} ${shapeSize.width * 0.75},${shapeSize.height - 10} ${shapeSize.width / 4},${shapeSize.height - 10} ${10},${shapeSize.height / 2}`} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Triangle = () => (
  <CommonShape className="triangle">
    <polygon points={`${shapeSize.width / 2},${10} ${shapeSize.width - 10},${shapeSize.height - 10} ${10},${shapeSize.height - 10}`} stroke="black" strokeWidth="2" fill="none" />
  </CommonShape>
);

export const Line = () => (
  <CommonShape className="line">
    <line x1="20" y1={shapeSize.height / 2} x2={shapeSize.width - 20} y2={shapeSize.height / 2} stroke="black" strokeWidth="2" />
  </CommonShape>
);

export const ConnectorLine = () => (
  <CommonShape className="connector-line">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="black" />
      </marker>
    </defs>
    <line x1="20" y1={shapeSize.height / 2} x2={shapeSize.width - 20} y2={shapeSize.height / 2} stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
  </CommonShape>
);

export const BidirectionalConnector = () => (
  <CommonShape className="bidirectional-connector">
    <defs>
      <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="black" />
      </marker>
      <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M9,0 L9,6 L0,3 z" fill="black" />
      </marker>
    </defs>
    <line x1="20" y1={shapeSize.height / 2} x2={shapeSize.width - 20} y2={shapeSize.height / 2} stroke="black" strokeWidth="2" markerStart="url(#arrow-end)" markerEnd="url(#arrow-start)" />
  </CommonShape>
);