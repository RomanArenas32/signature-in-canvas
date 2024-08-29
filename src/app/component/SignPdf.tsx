"use client";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableField from './DragableField';
import DocumentCanvas from './DocumentCanvas';
import { useState } from 'react';
import { jsPDF } from "jspdf";

interface DroppedField {
    type: string;
    label: string;
    x: number;
    y: number;
  }

export const SignPdf = () => {
    const [droppedFields, setDroppedFields] = useState<DroppedField[]>([]);

    const handleFieldDrop = (item : any) => {
        setDroppedFields((prevFields) => [...prevFields, item] as any);
    };

     const exportToPDF = () => {
        const doc = new jsPDF();
        
        // Puedes ajustar el tamaño del PDF para que se ajuste a tus necesidades
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        console.log('Page size:', pageWidth, pageHeight); // Verifica el tamaño de la página

        // Itera sobre los campos arrastrados y añade su contenido al PDF
        droppedFields.forEach((field) => {
            const xPos = field.x; // Asegúrate de que esto esté en el rango del PDF
            const yPos = field.y; // Asegúrate de que esto esté en el rango del PDF

            console.log('Adding field:', field.label, 'at', xPos, yPos); // Verifica las coordenadas

            doc.text(field.label, xPos, yPos);
        });

        // Guarda el PDF
        doc.save('document.pdf');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div>
                    <h1>Drag and Drop Example</h1>
                    <DraggableField type="signature" label="Signature" />
                </div>

                <DocumentCanvas onFieldDrop={handleFieldDrop} />

                <button onClick={exportToPDF}>Export to PDF</button>

                {droppedFields.map((field, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: field.x - 50, // Ajusta según sea necesario
                            top: field.y - 25, // Ajusta según sea necesario
                            width: '100px', // Ajusta según sea necesario
                            height: '50px', // Ajusta según sea necesario
                            backgroundColor: '#ff0000',
                            color: '#fff',
                            textAlign: 'center',
                            lineHeight: '50px',
                            borderRadius: '5px',
                            zIndex: 10
                        }}
                    >
                        {field.label}
                    </div>
                ))}
            </div>
        </DndProvider>
    );
};
