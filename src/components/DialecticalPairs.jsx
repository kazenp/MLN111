import React from 'react';
import { motion } from 'framer-motion';

const pairs = [
  { 
    title: "Ý thức thông thường", 
    desc: "Tri thức, quan niệm hình thành trực tiếp trong hoạt động thường ngày. Rất sinh động, phong phú nhưng ở trình độ thấp, chưa được khái quát hóa, dễ thấy bề mặt." 
  },
  { 
    title: "Ý thức lý luận", 
    desc: "Những tư tưởng, quan niệm được tổng quát, hệ thống hóa thành học thuyết, phạm trù. Phản ánh sâu sắc, chính xác bản chất các quan hệ xã hội ở trình độ cao." 
  },
  { 
    title: "Tâm lý xã hội", 
    desc: "Bao gồm tình cảm, ước muốn, thói quen, tập quán của con người hình thành trực tiếp dưới tác động của đời sống hàng ngày (thuộc ý thức thông thường)." 
  },
  { 
    title: "Hệ tư tưởng", 
    desc: "Hệ thống các quan điểm, tư tưởng (chính trị, triết học, nghệ thuật,...) phản ánh sâu sắc, gián tiếp tồn tại xã hội (thuộc ý thức lý luận)." 
  },
  { 
    title: "Ý thức cá nhân", 
    desc: "Là thế giới tinh thần của từng con người cụ thể. Ý thức cá nhân có phản ánh ý thức xã hội nhưng mang đậm dấu ấn hoàn cảnh sống riêng biệt." 
  },
  { 
    title: "Ý thức xã hội", 
    desc: "Ý thức xã hội luôn phải được thể hiện qua các ý thức cá nhân cụ thể. Tuy nhiên, không một ý thức cá nhân nào có thể đại diện cho toàn bộ ý thức xã hội." 
  }
];

const DialecticalPairs = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Kết Cấu Của Ý Thức Xã Hội</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Phân loại theo trình độ nhận thức và chủ thể phản ánh trong đời sống tinh thần.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((pair, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, backgroundColor: '#fff5f5' }}
              className="p-8 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-soviet-red mb-3 uppercase tracking-wider border-b-2 border-soviet-gold pb-2 w-fit">{pair.title}</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {pair.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DialecticalPairs;
