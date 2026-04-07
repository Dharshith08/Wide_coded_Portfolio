"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TiltCard({ children, className, onClick }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    setRotateX(((y - centerY) / centerY) * -5);
    setRotateY(((x - centerX) / centerX) * 5);
  };

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
      animate={{ rotateX, rotateY }}
      whileHover={{ y: -7, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.button>
  );
}
