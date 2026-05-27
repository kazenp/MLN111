import React from 'react';
import { motion } from 'framer-motion';
import { Users, Factory, Globe, BookOpen } from 'lucide-react';

const theories = [
  {
    title: "Khái Niệm",
    icon: <BookOpen className="w-8 h-8 text-soviet-red" />,
    description: "Tồn tại xã hội là toàn bộ đời sống vật chất và những điều kiện sinh hoạt vật chất của xã hội trong những giai đoạn lịch sử nhất định, tạo nên nền tảng thực tế của đời sống loài người."
  },
  {
    title: "Phương Thức Sản Xuất",
    icon: <Factory className="w-8 h-8 text-soviet-red" />,
    description: "Là cách thức con người tiến hành sản xuất của cải vật chất ở mỗi giai đoạn lịch sử. Đây là yếu tố cơ bản nhất và giữ vai trò quyết định đối với tồn tại xã hội."
  },
  {
    title: "Hoàn Cảnh Địa Lý",
    icon: <Globe className="w-8 h-8 text-soviet-red" />,
    description: "Bao gồm các điều kiện tự nhiên, môi trường sinh thái bao quanh xã hội (khí hậu, tài nguyên, đất đai...). Đây là điều kiện thường xuyên, tất yếu cho sự sinh sống của con người."
  },
  {
    title: "Dân Cư & Mật Độ",
    icon: <Users className="w-8 h-8 text-soviet-red" />,
    description: "Bao gồm số lượng dân cư, cơ cấu dân số, mật độ phân bố và tốc độ phát triển. Đây là chủ thể sản xuất vật chất, tác động trực tiếp đến động lực của lực lượng sản xuất."
  }
];

const TheorySection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 tracking-tight">Tồn Tại Xã Hội (Đời Sống Vật Chất)</h2>
          <p className="text-zinc-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Tồn tại xã hội là toàn bộ sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội. Theo Marx, đây chính là "đời sống thực tế" quyết định tư duy, nhận thức và ý thức tinh thần của con người.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {theories.map((theory, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glow-card p-8 rounded-xl group border-t-4 border-t-soviet-red shadow-lg"
            >
              <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300 p-3 bg-soviet-red/5 rounded-lg w-fit">
                {theory.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-wide">{theory.title}</h3>
              <p className="text-zinc-600 leading-relaxed">
                {theory.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheorySection;
