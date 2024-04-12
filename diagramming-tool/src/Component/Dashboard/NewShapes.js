const shapeSize = { width: 80, height: 80 };
const arrowSize=10;

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
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 40} stroke="Black" strokeWidth="2" fill="White" />
  </CommonShape>
);



export const Circle = () => (
  <CommonShape className="circle">
    <circle cx={shapeSize.width / 2} cy={shapeSize.height / 2} r={(shapeSize.width - 20) / 2} stroke="Black" strokeWidth="2" fill="White" />
  </CommonShape>
);

export const Square = () => (
  <CommonShape className="square">
    <rect x="10" y="10" width={shapeSize.width - 20} height={shapeSize.height - 20} stroke="black" strokeWidth="2" fill="White" />
  </CommonShape>
);
export const Diamond = () => (
  <CommonShape className="diamond">
    <polygon points={`${shapeSize.width / 2},${10} ${shapeSize.width - 10},${shapeSize.height / 2} ${shapeSize.width / 2},${shapeSize.height - 10} ${10},${shapeSize.height / 2}`} stroke="black" strokeWidth="2" fill="White" />
  </CommonShape>
);
export const Line = () => (
  <CommonShape className="line">
    <line x1="10" y1="5" x2={shapeSize.width - 10} y2={shapeSize.height - 10} stroke="black" strokeWidth="2" fill="black" />
  </CommonShape>
);

export const ConnectorLine = () => (
  
   
  <CommonShape className="connector-line">
   
    
    <line x1={shapeSize.width / 2} y1={shapeSize.height / 4} x2={shapeSize.width / 2} y2={(shapeSize.height * 3) / 4} stroke="black" strokeWidth="2" />
    <path d={`M${shapeSize.width / 2},${shapeSize.height / 4} L${(shapeSize.width / 2) - arrowSize / 2},${(shapeSize.height / 4) + arrowSize} L${(shapeSize.width / 2) + arrowSize / 2},${(shapeSize.height / 4) + arrowSize} Z`} fill="black" />
  </CommonShape>
);


export const BidirectionalConnector = () => {
  const arrowSize = 10;
  const halfArrowSize = arrowSize / 2;

  return (
    <CommonShape className="bidirectional-connector">
      <line x1={shapeSize.width / 4} y1={shapeSize.height / 2} x2={(shapeSize.width * 3) / 4} y2={shapeSize.height / 2} stroke="black" strokeWidth="2" />
      <polygon points={`${shapeSize.width / 4},${shapeSize.height / 2 - halfArrowSize} ${shapeSize.width / 4},${shapeSize.height / 2 + halfArrowSize} ${shapeSize.width / 4 - arrowSize},${shapeSize.height / 2}`} fill="black" /> 
      <polygon points={`${(shapeSize.width * 3) / 4},${shapeSize.height / 2 - halfArrowSize} ${(shapeSize.width * 3) / 4},${shapeSize.height / 2 + halfArrowSize} ${(shapeSize.width * 3) / 4 + arrowSize},${shapeSize.height / 2}`} fill="black" />
    </CommonShape>
  );
}
