import React, { useState, useEffect, useRef } from 'react';

const CloudDeploymentVisualization = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle', 'active', 'returning'
  const containerRef = useRef(null);

  // Grid configuration
  const cols = 16;
  const rows = 10;
  const dotSpacing = 30;
  const baseDotRadius = 6;
  const blueDotRadius = 10;

  // Original blue dot pattern (cloud shape)
  const originalBlueDots = [
    // Row 3
    { row: 3, col: 6 }, { row: 3, col: 7 }, { row: 3, col: 8 },
    // Row 4
    { row: 4, col: 5 }, { row: 4, col: 6 }, { row: 4, col: 7 }, { row: 4, col: 8 }, { row: 4, col: 9 },
    // Row 5
    { row: 5, col: 3 }, { row: 5, col: 4 }, { row: 5, col: 5 }, { row: 5, col: 6 }, { row: 5, col: 7 }, { row: 5, col: 8 }, { row: 5, col: 9 }, { row: 5, col: 10 },
    // Row 6
    { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 }, { row: 6, col: 8 }, { row: 6, col: 9 }, { row: 6, col: 10 }, { row: 6, col: 11 },
    // Row 7
    { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 }, { row: 7, col: 8 }, { row: 7, col: 9 }, { row: 7, col: 10 }, { row: 7, col: 11 },
    // Row 8
    { row: 8, col: 3 }, { row: 8, col: 4 }, { row: 8, col: 5 }, { row: 8, col: 6 }, { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 8, col: 9 }, { row: 8, col: 10 }
  ];

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = (e) => {
    // Immediately update mouse position on enter
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setIsMouseOver(true);
    setTransitionPhase('active');
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setTransitionPhase('returning');

    // Reset to idle after animation completes
    setTimeout(() => {
      setTransitionPhase('idle');
      setMousePosition({ x: -1000, y: -1000 });
    }, 2000);
  };

  // Calculate distance between two points
  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Check if a dot is in the original blue pattern
  const isInOriginalPattern = (row, col) => {
    return originalBlueDots.some(d => d.row === row && d.col === col);
  };

  // Get the center of the cloud pattern
  const getCloudCenter = () => {
    const avgCol = originalBlueDots.reduce((sum, dot) => sum + dot.col, 0) / originalBlueDots.length;
    const avgRow = originalBlueDots.reduce((sum, dot) => sum + dot.row, 0) / originalBlueDots.length;
    return {
      x: avgCol * dotSpacing + 20,
      y: avgRow * dotSpacing + 20
    };
  };

  const cloudCenter = getCloudCenter();

  // Determine dot properties based on position and mouse
  const getDotProperties = (row, col) => {
    const dotX = col * dotSpacing + 20;
    const dotY = row * dotSpacing + 20;
    const distanceFromMouse = getDistance(dotX, dotY, mousePosition.x, mousePosition.y);
    const distanceFromCloudCenter = getDistance(dotX, dotY, cloudCenter.x, cloudCenter.y);
    const isOriginalBlue = isInOriginalPattern(row, col);

    let color = '#1f2937'; // Default dark grey
    let scale = 1;
    let opacity = 1;
    let translateX = 0;
    let translateY = 0;

    if (transitionPhase === 'active' && isMouseOver) {
      // Active state - create a blue cluster around mouse
      // Similar size to original cloud pattern (about 40-45 dots)
      if (distanceFromMouse < 70) {
        color = '#2563eb';
        scale = 1.1;
      } else if (distanceFromMouse < 100) {
        color = '#3b82f6';
        scale = 1.05;
      } else if (distanceFromMouse < 130) {
        color = '#60a5fa';
        scale = 1;
      }
    } else if (transitionPhase === 'returning') {
      // Returning state - dots flow back to form the cloud
      if (isOriginalBlue) {
        // Original cloud dots always become blue
        color = '#2563eb';
        scale = 1.02;

        // Add a subtle "coming home" effect
        const time = Date.now() / 1000;
        const wave = Math.sin(time * 2 + row + col) * 0.02;
        scale = scale + wave;
      } else {
        // Non-original dots fade out if they were blue
        const distToOriginal = Math.min(
          ...originalBlueDots.map(d =>
            getDistance(col * dotSpacing + 20, row * dotSpacing + 20,
              d.col * dotSpacing + 20, d.row * dotSpacing + 20)
          )
        );

        if (distToOriginal < 100) {
          opacity = Math.max(0.3, distToOriginal / 100);
        }
      }
    } else {
      // Idle state - show cloud pattern
      if (isOriginalBlue) {
        color = '#2563eb';
        // Add subtle floating animation
        const time = Date.now() / 1000;
        const floatOffset = Math.sin(time + row + col) * 0.5;
        translateY = floatOffset;
      }
    }

    return { color, scale, opacity, translateX, translateY };
  };

  // Generate dots
  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dotX = col * dotSpacing + 20;
      const dotY = row * dotSpacing + 20;
      const { color, scale, opacity, translateX, translateY } = getDotProperties(row, col);

      // Calculate staggered delay for return animation
      const distanceFromCenter = getDistance(dotX, dotY, cloudCenter.x, cloudCenter.y);
      const delay = transitionPhase === 'returning'
        ? Math.random() * 0.3
        : 0;

      // Determine radius based on whether it's blue (either original or near mouse)
      const isBlue = color === '#2563eb' || color === '#3b82f6' || color === '#60a5fa';
      const radius = isBlue || isInOriginalPattern(row, col) ? blueDotRadius : baseDotRadius;

      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={dotX}
          cy={dotY}
          r={radius}
          fill={color}
          opacity={opacity}
          transform={`translate(${translateX}, ${translateY}) scale(${scale})`}
          style={{
            transformOrigin: `${dotX}px ${dotY}px`,
            transition: transitionPhase === 'returning'
              ? `all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`
              : transitionPhase === 'active'
                ? `all 0.3s ease-out`
                : `all 0.4s ease-out`,
          }}
        />
      );
    }
  }

  return (
    <div style={styles.container}>
      {/* Left side - Interactive dots */}
      <div
        ref={containerRef}
        style={styles.leftSection}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg style={styles.svg}>
          {/* Add subtle glow effect to blue dots */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Invisible background rect to capture all mouse events */}
          <rect
            width="100%"
            height="100%"
            fill="transparent"
            style={{ pointerEvents: 'all' }}
          />
          <g filter={transitionPhase === 'idle' ? "url(#glow)" : ""}>
            {dots}
          </g>
        </svg>
      </div>

      {/* Divider line */}
      <div style={styles.divider} />

      {/* Right side - Text content */}
      <div style={styles.rightSection}>
        <div style={styles.header}>
          <span style={styles.subheading}>FLEXIBLE DEPLOYMENT</span>
          <h1 style={styles.title}>Cloud</h1>
        </div>

        <div style={styles.description}>
          <p style={styles.descriptionText}>
            DEPLOY ANYWHERE - CLOUD, ON-PREMISES, OR HYBRID INFRASTRUCTURE
          </p>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <span style={styles.checkmark}>✓</span>
            <span style={styles.featureText}>MULTI-CLOUD SUPPORT (AWS, AZURE, GCP)</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.checkmark}>✓</span>
            <span style={styles.featureText}>ON-PREMISES DEPLOYMENT OPTIONS</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.checkmark}>✓</span>
            <span style={styles.featureText}>HYBRID CLOUD CONFIGURATIONS</span>
          </div>
          <div style={styles.feature}>
            <span style={styles.checkmark}>✓</span>
            <span style={styles.featureText}>DOCKER CONTAINERIZATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '400px',
    backgroundColor: '#0a0a0a',
    fontFamily: "'Alliance No.2', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    overflow: 'hidden',
    border: '1px solid #333',
    position: 'relative'
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px'
  },
  svg: {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    pointerEvents: 'all'
  },
  divider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundImage: 'repeating-linear-gradient(to bottom, #333 0, #333 5px, transparent 5px, transparent 10px)'
  },
  rightSection: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  header: {
    marginBottom: '30px'
  },
  subheading: {
    color: '#6b7280',
    fontSize: '11px',
    letterSpacing: '3px',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  title: {
    color: '#ffffff',
    fontSize: '55px',
    fontWeight: '300',
    margin: '10px 0 0 0',
    letterSpacing: '-3px'
  },
  description: {
    marginBottom: '30px'
  },
  descriptionText: {
    color: '#999',
    fontSize: '10px',
    lineHeight: '1.8',
    letterSpacing: '1px',
    maxWidth: '280px',
    textTransform: 'uppercase'
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  checkmark: {
    color: '#4ade80',
    fontSize: '12px',
    marginTop: '-1px'
  },
  featureText: {
    color: '#999',
    fontSize: '9px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  }
};

export default CloudDeploymentVisualization;