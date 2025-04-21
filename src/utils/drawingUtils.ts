
import { Point } from "../types";

// Utility to simplify stroke points (reduce the number of points for performance)
export function simplifyStroke(points: Point[], tolerance: number = 5): Point[] {
  if (points.length <= 2) return points;
  
  const result: Point[] = [points[0]];
  let lastPoint = points[0];
  
  for (let i = 1; i < points.length - 1; i++) {
    const point = points[i];
    const dx = point.x - lastPoint.x;
    const dy = point.y - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance >= tolerance) {
      result.push(point);
      lastPoint = point;
    }
  }
  
  // Always include the last point
  result.push(points[points.length - 1]);
  
  return result;
}

// Utility to clear the canvas
export function clearCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Utility to draw a stroke on a canvas
export function drawStroke(
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  size: number,
  tool: string
) {
  if (points.length < 2) return;
  
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  
  context.strokeStyle = color;
  context.lineWidth = size;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  
  if (tool === 'eraser') {
    context.globalCompositeOperation = 'destination-out';
  } else {
    context.globalCompositeOperation = 'source-over';
  }
  
  context.stroke();
  context.globalCompositeOperation = 'source-over';
}

// Utility to generate a random color from the Holi palette
export function getRandomHoliColor(): string {
  const holiColors = [
    '#9b87f5', // Purple
    '#ff3f8e', // Pink
    '#33C3F0', // Blue
    '#59e6a3', // Green
    '#ffd965', // Yellow
    '#F97316', // Orange
    '#ea384c', // Red
  ];
  
  return holiColors[Math.floor(Math.random() * holiColors.length)];
}
