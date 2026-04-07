"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Systems Shipped", value: "24+" },
  { label: "Latency Focus", value: "<100ms" },
  { label: "AI Workflows", value: "15+" }
];

export default function HeroMetrics() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{metric.label}</p>
          <p className="mt-2 font-display text-2xl text-text">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
