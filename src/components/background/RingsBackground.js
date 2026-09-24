"use client";

import { useRef, useState } from "react";

const RINGS = [
  {
    size: 540,
    color: "#b3541e",
    duration: "24s",
    reverse: false,
    top: "47%",
    left: "53%",
    radius: "32% 68% 62% 38% / 65% 42% 58% 35%",
  },
  {
    size: 500,
    color: "#5b7a4f",
    duration: "19s",
    reverse: true,
    top: "54%",
    left: "46%",
    radius: "66% 34% 40% 60% / 38% 63% 37% 62%",
  },
  {
    size: 460,
    color: "#c99a2e",
    duration: "15s",
    reverse: false,
    top: "45%",
    left: "49%",
    radius: "42% 58% 68% 32% / 58% 35% 65% 42%",
  },
];

function DraggableRing({ ring }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const { x, y, offsetX, offsetY } = dragStart.current;
    setOffset({
      x: offsetX + (e.clientX - x),
      y: offsetY + (e.clientY - y),
    });
  };

  const handlePointerUp = () => {
    setDragging(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="absolute pointer-events-auto cursor-grab select-none active:cursor-grabbing"
      style={{
        top: ring.top,
        left: ring.left,
        width: ring.size,
        height: ring.size,
        touchAction: "none",
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
        transition: dragging ? "none" : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <span
        className="block h-full w-full"
        style={{
          borderRadius: ring.radius,
          border: `4px solid ${ring.color}`,
          boxShadow: `0 0 70px 6px ${ring.color}2e`,
          animation: `${ring.reverse ? "ring-spin-reverse" : "ring-spin"} ${ring.duration} linear infinite`,
        }}
      />
    </div>
  );
}

export default function RingsBackground() {
  return (
    <div
      aria-hidden="true"
      className="rings-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {RINGS.map((ring, i) => (
        <DraggableRing key={i} ring={ring} />
      ))}
    </div>
  );
}
