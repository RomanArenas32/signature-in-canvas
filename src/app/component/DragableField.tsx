"use client";
import { useDrag } from 'react-dnd';
import { CSSProperties, RefObject } from 'react';

interface DraggableFieldProps {
  type: string; 
  label: string;
}

const DraggableField = ({ type, label }: DraggableFieldProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [type, label]);

  // Type assertion for ref
  const dragRef = drag as any;

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move', 
    padding: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    margin: '4px',
  };

  return (
    <div
      ref={dragRef}
      style={style}
    >
      {label}
    </div>
  );
};

export default DraggableField;
