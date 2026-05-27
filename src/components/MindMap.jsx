import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 'existence', label: 'Tồn tại xã hội', x: 25, y: 50, color: '#0D5C75', width: 22 },
  { id: 'consciousness', label: 'Ý thức xã hội', x: 75, y: 50, color: '#0D5C75', width: 22 },
  { id: 'production', label: 'Phương thức sản xuất', x: 25, y: 20, color: '#D97706', width: 30 },
  { id: 'natural_pop', label: 'Dân cư & Tự nhiên', x: 15, y: 80, color: '#D97706', width: 26 },
  { id: 'dialectics', label: 'Quan hệ biện chứng', x: 50, y: 50, color: '#0D5C75', width: 26 },
  { id: 'independence', label: 'Tính độc lập tương đối', x: 75, y: 80, color: '#D97706', width: 32 },
  { id: 'forms', label: 'Các hình thái ý thức', x: 80, y: 20, color: '#D97706', width: 30 },
];

const links = [
  { source: 'production', target: 'existence' },
  { source: 'natural_pop', target: 'existence' },
  { source: 'existence', target: 'dialectics' },
  { source: 'dialectics', target: 'consciousness' },
  { source: 'consciousness', target: 'independence' },
  { source: 'consciousness', target: 'forms' },
];

const MindMap = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const isRelated = (nodeId) => {
    if (!hoveredNode) return false;
    if (hoveredNode === nodeId) return true;
    return links.some(link => 
      (link.source === hoveredNode && link.target === nodeId) ||
      (link.target === hoveredNode && link.source === nodeId)
    );
  };

  return (
    <section className="py-24 px-6 bg-soviet-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 tracking-tight uppercase">Sơ Đồ Tư Duy</h2>
        <div className="h-2 w-24 bg-soviet-gold mx-auto mb-8 rounded-full shadow-sm" />
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em]">Di chuột qua các nút để thấy các mối liên hệ chính của bài học</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="relative aspect-video max-w-5xl mx-auto bg-white rounded-[3rem] border-4 border-zinc-100 p-12 shadow-2xl"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {links.map((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            const active = hoveredNode === link.source || hoveredNode === link.target;
            
            return (
              <motion.line
                key={i}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={active ? '#0D5C75' : '#f4f4f5'}
                strokeWidth={active ? 0.8 : 0.4}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {nodes.map((node) => {
            const active = isRelated(node.id);
            const height = 7;
            const width = node.width;
            
            return (
              <motion.g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                {/* Nút tròn ở giữa tâm để giữ điểm kết nối */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1.5"
                  fill={active ? '#0D5C75' : node.color}
                  className="pointer-events-none"
                />

                {/* Thẻ nền (Card background) để che đường kẻ bên dưới */}
                <motion.rect
                  x={node.x - width / 2}
                  y={node.y - height / 2}
                  width={width}
                  height={height}
                  rx="1.5"
                  ry="1.5"
                  fill="white"
                  stroke={active ? '#0D5C75' : node.color}
                  strokeWidth={active ? 0.6 : 0.4}
                  animate={{
                    scale: active ? 1.05 : 1,
                    strokeWidth: active ? 0.8 : 0.4,
                  }}
                  className="shadow-sm transition-all duration-300"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                
                {/* Chữ hiển thị ở giữa card */}
                <text
                  x={node.x}
                  y={node.y}
                  dy="0.8"
                  textAnchor="middle"
                  fill={active ? '#0D5C75' : '#27272a'}
                  fontSize="2.2"
                  fontWeight="900"
                  className="pointer-events-none select-none uppercase tracking-wider"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>
    </section>
  );
};

export default MindMap;
