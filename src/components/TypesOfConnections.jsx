import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Brain, Layers } from 'lucide-react';

const connections = [
  {
    icon: BookOpen,
    title: "Khái Niệm Ý Thức Xã Hội",
    desc: "Ý thức xã hội là phương diện sinh hoạt tinh thần của xã hội, bao gồm tình cảm, ước muốn, thói quen, truyền thống, hệ thống quan điểm, lý luận phản ánh tồn tại xã hội ở những giai đoạn phát triển nhất định."
  },
  {
    icon: Heart,
    title: "Tâm Lý Xã Hội",
    desc: "Là toàn bộ tình cảm, ước muốn, tâm trạng, thói quen, tập quán... của con người hình thành trực tiếp dưới tác động của đời sống hàng ngày, mang tính tự phát và chưa hệ thống hóa."
  },
  {
    icon: Brain,
    title: "Hệ Tư Tưởng Xã Hội",
    desc: "Là hệ thống các quan điểm, tư tưởng (chính trị, pháp quyền, đạo đức, khoa học...) phản ánh sâu sắc, gián tiếp tồn tại xã hội, được hệ thống hóa thành lý luận khoa học hoặc học thuyết lý thuyết."
  },
  {
    icon: Layers,
    title: "Các Hình Thái Ý Thức",
    desc: "Ý thức xã hội biểu hiện phong phú qua nhiều hình thái: ý thức chính trị, ý thức pháp quyền, ý thức đạo đức, ý thức tôn giáo, ý thức thẩm mỹ (nghệ thuật), ý thức khoa học và ý thức triết học."
  },
];

const TypesOfConnections = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            Ý Thức Xã Hội (Đời Sống Tinh Thần)
          </h2>
          <p className="text-lg text-zinc-500 max-w-3xl mx-auto font-medium">
            Ý thức xã hội là phương diện sinh hoạt tinh thần. Nó không tự nhiên sinh ra mà là **sản phẩm phản ánh** của đời sống vật chất thực tế (tồn tại xã hội) ở từng thời kỳ lịch sử.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {connections.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border-2 transition-all group cursor-pointer bg-white ${
                idx === 0 
                ? 'border-soviet-orange shadow-lg' 
                : 'border-soviet-red/20 hover:border-soviet-red/50 hover:shadow-md'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ${
                idx === 0 ? 'bg-soviet-red' : 'bg-soviet-orange'
              }`}>
                <c.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-center mb-4 ${
                idx === 0 ? 'text-soviet-orange' : 'text-soviet-red'
              }`}>
                {c.title}
              </h3>
              <p className="text-zinc-600 text-center text-sm leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypesOfConnections;
