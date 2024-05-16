import { fabric } from "fabric";

export const addRectangleShape = (canvas) => {
    const rect = new fabric.Rect({
        left: 50,
        top: 50,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
        width: 150,
        height: 100
    });
    canvas.add(rect);
};

export const addCircleShape = (canvas) => {
    const cir = new fabric.Circle({
        radius: 50,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
        top: 50,
        left: 200
    });
    canvas.add(cir);
};

export const addSquareShape = (canvas) => {
    const square = new fabric.Rect({
        left: 300,
        top: 50,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
        width: 100,
        height: 100
    });
    canvas.add(square);
};

export const addTriangleShape = (canvas) => {
    const triangle = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: '#ffffff',
        stroke: '#rrggbb',
        strokeWidth: 2,
        left: 400,
        top: 50
    });
    canvas.add(triangle);
};

export const addDiamondShape = (canvas) => {
    const diamond = new fabric.Polygon([
        { x: 75, y: 0 },
        { x: 150, y: 50 },
        { x: 75, y: 100 },
        { x: 0, y: 50 }
    ], {
        left: 500,
        top: 50,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
    });
    canvas.add(diamond);
};

export const addRoundedRectangleShape = (canvas) => {
    const roundedRect = new fabric.Rect({
        left: 200,
        top: 200,
        fill: '#ffffff',
        width: 150,
        height: 100,
        rx: 20,
        ry: 20,
        stroke: ' #rrggbb',
        strokeWidth: 2
    });

    canvas.add(roundedRect);
};

export const addPolygonShape = (canvas) => {
    const polygon = new fabric.Polygon([
        { x: 200, y: 0 },
        { x: 250, y: 50 },
        { x: 250, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 50 }
    ], {
        left: 400,
        top: 200,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
    });
    canvas.add(polygon);
};

export const addHexagonShape = (canvas) => {
    const hexagon = new fabric.Polygon([
        { x: 50, y: 25 },
        { x: 100, y: 25 },
        { x: 125, y: 75 },
        { x: 100, y: 125 },
        { x: 50, y: 125 },
        { x: 25, y: 75 }
    ], {
        left: 600,
        top: 200,
        stroke: ' #rrggbb',
        strokeWidth: 2,
        fill: '#ffffff',
    });
    canvas.add(hexagon);
};

export const addEllipseShape = (canvas) => {
    const ellipse = new fabric.Ellipse({
        rx: 75,
        ry: 50,
        fill: '#ffffff',
        stroke: ' #rrggbb',
        strokeWidth: 2,
        top: 200,
        left: 50
    });
    canvas.add(ellipse);
};

export const addLine = ({ canvas, currentBorderColor }) => {
    const line = new fabric.Line([50, 100, 300, 100], {
        left: 50,
        top: 350,
        strokeWidth: 2,
        stroke: currentBorderColor,
    });
    canvas.add(line);
};


export const addArrowLine = ({ canvas, currentBorderColor }) => {
    const line = new fabric.Line([50, 380, 300, 380], {
        stroke: currentBorderColor,
        fill: currentBorderColor,
        strokeWidth: 2,
        selectable: true
    });

    const arrow = new fabric.Triangle({
        width: 10,
        height: 10,
        fill: currentBorderColor,
        stroke: currentBorderColor,
        left: 300,
        top: 380,
        angle: 90,
        originX: 'center',
        originY: 'center'
    });
    const group = new fabric.Group([line, arrow], {});

    canvas.add(group);
};

export const addBidirectionalArrowLine = ({ canvas, currentBorderColor, currentBorderWidth }) => {
    const line = new fabric.Line([50, 410, 300, 410], {
        stroke: currentBorderColor,
        strokeWidth: 2,
        selectable: true
    });

    const arrow1 = new fabric.Triangle({
        width: 10,
        height: 10,
        fill: currentBorderColor,
        left: 50,
        top: 410,
        angle: -90,
        originX: 'center',
        originY: 'center'
    });

    const arrow2 = new fabric.Triangle({
        width: 10,
        height: 10,
        fill: currentBorderColor,
        left: 300,
        top: 410,
        angle: 90,
        originX: 'center',
        originY: 'center'
    });
    const group = new fabric.Group([line, arrow1, arrow2], {});


    group.set({
        stroke: currentBorderColor,
        strokeWidth: currentBorderWidth,
    });

    canvas.add(group);
};