"use client"
import { useDrop } from 'react-dnd';
import { useRef, useCallback } from 'react';

interface DroppedField {
  type: string;
  label: string;
  x: number;
  y: number;
}

interface DocumentCanvasProps {
  onFieldDrop: (item: DroppedField) => void;
}

const DocumentCanvas = ({ onFieldDrop }: DocumentCanvasProps) => {
  const canvasRef = useRef<any>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        onFieldDrop({ ...item, x, y } as DroppedField);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Function to set the ref
  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      canvasRef.current = node;
    }
  }, []);

  return (
    <div
      ref={(node) => {
        setRef(node); // Set the ref safely
        drop(node);
      }}
      style={{
        height: '200px',
        width: '100%',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {isOver ? <p>Release to drop</p> : <p>Drag a field here</p>}
    </div>
  );
};

export default DocumentCanvas;
