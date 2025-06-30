import React, { useRef, useEffect, useState } from 'react';
import styles from './StarPattern.module.scss';
import * as Icons from '@/shared/ui/icons';

const StarPattern = () => {
  const containerRef = useRef(null);
  const [cells, setCells] = useState([]);
  const [mousePos, setMousePos] = useState(null);

  const gridSize = 40;
  const maxRadius = 400;

  useEffect(() => {
    const generateGrid = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cols = Math.ceil(rect.width / gridSize);
      const rows = Math.ceil(rect.height / gridSize);

      const newCells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newCells.push({ x, y });
        }
      }
      setCells(newCells);
    };

    generateGrid();
    window.addEventListener('resize', generateGrid);
    return () => window.removeEventListener('resize', generateGrid);
  }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
        const container = containerRef.current;
        if (!container) return;
    
        const rect = container.getBoundingClientRect();
    
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

  const getBrightnessStyle = (cellX, cellY) => {
    if (!mousePos) return { filter: 'brightness(0.4)', transition: 'filter 0.2s ease' };

    const dx = cellX * gridSize - mousePos.x;
    const dy = cellY * gridSize - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let brightness = 0.1;
    if (distance < maxRadius) {
      const ratio = 1 - distance / maxRadius;
      brightness = 0.1 + ratio;
    }

    return {
      filter: `brightness(${brightness})`,
      transition: 'filter 0.2s ease',
    };
  };

  return (
    <div
      className={styles.GridPattern}
      ref={containerRef}
      style={{ pointerEvents: 'auto' }}
    >
      {cells.map((cell, index) => (
        <div
          key={index}
          className={styles.cell}
          style={{
            left: `${cell.x * gridSize}px`,
            top: `${cell.y * gridSize}px`,
            ...getBrightnessStyle(cell.x, cell.y),
            pointerEvents: 'none',
          }}
        >
          <Icons.Y2kStarIcon style={{ pointerEvents: 'none' }} />
        </div>
      ))}
    </div>
  );
};

export default StarPattern;