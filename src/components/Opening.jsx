import React, { useRef, useState, useCallback } from 'react';
import ThreeLinePattern from '@abhijeet42cy6/vector-lines';

// Helper: distance from point to center of box
function distanceToBoxCenter(mouse, box) {
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  return Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
}

export default function Opening() {
  // Do NOT change line angles or lengths - exact from vector_lines
  const lines = {
    line1: {
      start: { x: 13.5, y: 0 },
      end: { x: 13.5, y: 13 }
    },
    line2: {
      start: { x: 13.5, y: 13 },
      end: { x: 27, y: 14 }
    },
    line3: {
      start: { x: 13.5, y: 13 },
      end: { x: 9, y: 19 }
    }
  };

  // Pattern grid constants
  const ROWS = 6;
  const COLS = 24;
  const BOX_W = 27;
  const BOX_H = 26;
  const H_GAP = 27; // from .hard-row gap
  const V_GAP = 32; // from .hard-grid gap

  // Hidden indices per row
  const hiddenMap = [
    [7, 16, 19],
    [1, 5, 14, 21],
    [2, 7, 10, 15, 23],
    [4, 5, 16, 22],
    [1, 6, 14, 23],
    [11, 12, 15],
  ];

  // Split grid for top and bottom
  const gridTop = [];
  const gridBottom = [];
  let idx = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!hiddenMap[row].includes(col)) {
        if (row < 3) {
          gridTop.push({ row, col, idx });
        } else {
          gridBottom.push({ row: row - 3, col, idx });
        }
        idx++;
      }
    }
  }

  // Top grid state
  const gridTopRef = useRef(null);
  const [hoverIdxTop, setHoverIdxTop] = useState(null);
  const getBoxRectsTop = useCallback(() => {
    return gridTop.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridTop]);
  const handleMouseMoveTop = (e) => {
    const rect = gridTopRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsTop();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxTop(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveTop = () => setHoverIdxTop(null);

  // Bottom grid state
  const gridBottomRef = useRef(null);
  const [hoverIdxBottom, setHoverIdxBottom] = useState(null);
  const getBoxRectsBottom = useCallback(() => {
    return gridBottom.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridBottom]);
  const handleMouseMoveBottom = (e) => {
    const rect = gridBottomRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsBottom();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxBottom(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveBottom = () => setHoverIdxBottom(null);

  // Style for a SINGLE pattern box (27×26) without repeating
  const singlePatternStyle = {
    position: 'relative',
    width: '27px',
    height: '26px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '27px 26px',
    backgroundPosition: 'center',
    opacity: 0.15, // default
    transition: 'opacity 0.2s, filter 0.2s',
    cursor: 'pointer',
  };

  // Render top rows
  let gridIdxTop = 0;
  const rowsTop = [];
  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxTop === gridIdxTop) {
          opacity = 1;
          lineColor = '#111';
        } else if (
          hoverIdxTop === gridIdxTop - 1 ||
          hoverIdxTop === gridIdxTop + 1
        ) {
          opacity = 0.5;
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxTop++;
      }
    }
    rowsTop.push(
      <div className="hard-row" key={row}>
        {cols}
      </div>
    );
  }

  // Render bottom rows
  let gridIdxBottom = 0;
  const rowsBottom = [];
  for (let row = 3; row < 6; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxBottom === gridIdxBottom) {
          opacity = 1;
          lineColor = '#111';
        } else if (
          hoverIdxBottom === gridIdxBottom - 1 ||
          hoverIdxBottom === gridIdxBottom + 1
        ) {
          opacity = 0.5;
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxBottom++;
      }
    }
    rowsBottom.push(
      <div className="hard-row" key={row}>
        {cols}
      </div>
    );
  }

  return (
    <div className="opening-container">
      <div
        className="hard-grid top-grid"
        ref={gridTopRef}
        onMouseMove={handleMouseMoveTop}
        onMouseLeave={handleMouseLeaveTop}
        style={{ userSelect: 'none' }}
      >
        {rowsTop}
      </div>

      <div className="text-section">
        <h1 className="main-text">
          the foundation of AI automation—<br />
          transforming <span className="highlight-text">unstructured documents<br />
          into machine-actionable data</span> across<br />
          your enterprise.
        </h1>
      </div>

      <div
        className="hard-grid bottom-grid"
        ref={gridBottomRef}
        onMouseMove={handleMouseMoveBottom}
        onMouseLeave={handleMouseLeaveBottom}
        style={{ userSelect: 'none' }}
      >
        {rowsBottom}
      </div>

      <div className="scroll-indicator">
        <span>SCROLL DOWN</span>
        <img src="/scroll_down_arrow.svg" alt="Scroll down arrow" className="scroll-arrow" />
      </div>
    </div>
  );
} 