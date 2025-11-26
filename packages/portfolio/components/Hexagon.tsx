'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

interface HexagonProps {
  size: number;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  children?: React.ReactNode;
  imageSource?: string | StaticImageData; // Adjusted for Next.js
  rotation?: number;
  cornerRadius?: number;
  desaturate?: boolean;
  className?: string; // Standard web prop
}

export function Hexagon({
  size,
  fill,
  stroke,
  strokeWidth = 1,
  children,
  imageSource,
  rotation = 0,
  cornerRadius: customCornerRadius,
  desaturate = false,
  className = '',
}: HexagonProps) {
  // Fade-in animation state
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset opacity when image source changes
  useEffect(() => {
    if (imageSource) {
      setIsLoaded(false);
    }
  }, [imageSource]);

  // Memoize the geometry calculations to prevent expensive recalculations
  const pathData = useMemo(() => {
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    
    // More rounded corners for larger hexagons, less for smaller ones
    const defaultCornerRadius = size >= 100 ? Math.min(size * 0.18, 12) : Math.min(size * 0.1, 4);
    const cornerRadius = customCornerRadius ?? defaultCornerRadius;

    // Convert rotation from degrees to radians
    const rotationRad = (rotation * Math.PI) / 180;

    // Create hexagon path points
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 6 + rotationRad;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push({ x, y });
    }

    // Create path with rounded corners
    const pathSegments: string[] = [];

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];

      // Calculate vectors
      const vecToPrev = { x: prev.x - current.x, y: prev.y - current.y };
      const vecToNext = { x: next.x - current.x, y: next.y - current.y };

      // Normalize vectors
      const lenPrev = Math.sqrt(vecToPrev.x * vecToPrev.x + vecToPrev.y * vecToPrev.y);
      const lenNext = Math.sqrt(vecToNext.x * vecToNext.x + vecToNext.y * vecToNext.y);
      const normPrev = { x: vecToPrev.x / lenPrev, y: vecToPrev.y / lenPrev };
      const normNext = { x: vecToNext.x / lenNext, y: vecToNext.y / lenNext };

      // Calculate start/end points of rounded corner
      const cornerStartX = current.x + normPrev.x * cornerRadius;
      const cornerStartY = current.y + normPrev.y * cornerRadius;
      const cornerEndX = current.x + normNext.x * cornerRadius;
      const cornerEndY = current.y + normNext.y * cornerRadius;

      if (i === 0) {
        pathSegments.push(`M ${cornerStartX},${cornerStartY}`);
      } else {
        pathSegments.push(`L ${cornerStartX},${cornerStartY}`);
      }

      // Add quadratic curve
      pathSegments.push(`Q ${current.x},${current.y} ${cornerEndX},${cornerEndY}`);
    }

    pathSegments.push('Z');
    return pathSegments.join(' ');
  }, [size, rotation, strokeWidth, customCornerRadius]);

  // Calculate image sizing
  const imagePadding = size < 50 ? size * 0.12 : size * 0.10;
  const imageSize = size - imagePadding * 2;

  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background SVG */}
      <svg 
        width={size} 
        height={size} 
        style={{ position: 'absolute', top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathData}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>

      {imageSource && (
        <>
          {/* Image Container */}
          <div
            style={{
              position: 'absolute',
              width: imageSize,
              height: imageSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              // Apply fade-in and desaturation logic
              opacity: isLoaded ? (desaturate ? 0.4 : 1) : 0,
              transition: 'opacity 300ms ease-in-out',
            }}
          >
            <Image
              src={imageSource}
              alt="Hexagon content"
              fill
              sizes={`${imageSize}px`}
              style={{ objectFit: 'cover' }}
              onLoad={() => setIsLoaded(true)}
              draggable={false}
            />
          </div>

          {/* Desaturation Overlay */}
          {desaturate && (
            <svg 
              width={size} 
              height={size} 
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
              <path d={pathData} fill="rgba(200, 200, 200, 0.5)" />
            </svg>
          )}
        </>
      )}

      {/* Children content */}
      {children && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      )}
    </div>
  );
}