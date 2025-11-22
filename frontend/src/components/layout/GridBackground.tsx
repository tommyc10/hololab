import React from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
}

export function GridBackground({ children }: GridBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full bg-empire-black overflow-hidden">
      
      {/* --- THE IMPERIAL GRID --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 
            1. The Grid Pattern 
            We use a small background size (40px) and linear gradients to draw lines.
            rgba(0, 240, 255, 0.03) is a very faint hologram blue.
        */}
        <div 
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* 
            2. The Vignette Mask 
            This radial gradient fades from transparent (center) to the base black color (edges),
            creating a spotlight effect on the content.
        */}
        <div className="absolute inset-0 bg-empire-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* --- CONTENT SLOT --- */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
