import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, ShieldAlert } from 'lucide-react';

const principles = [
  {
    icon: Users,
    title: "Tính Giai Cấp",
    description: "Trong xã hội có giai cấp, ý thức xã hội luôn mang tính giai cấp. Tâm lý, tình cảm, thói quen và hệ tư tưởng sẽ khác nhau giữa các giai cấp.",
  },
  {
    icon: Crown,
    title: "Giai Cấp Thống Trị",
    description: "Nắm giữ điều kiện vật chất và địa vị cao, lợi ích lớn. Hệ tư tưởng của họ thường đóng vai trò thống trị hệ tư tưởng của toàn xã hội để bảo vệ lợi ích ích kỷ.",
  },
  {
    icon: ShieldAlert,
    title: "Giai Cấp Bị Trị",
    description: "Có điều kiện vật chất và địa vị thấp kém. Ý thức của họ phản ánh sự đối lập lợi ích, từ đó hình thành các hệ tư tưởng tiến bộ đấu tranh cho sự công bằng.",
  },
];

const TheoryFoundation = () => {
  return (
    <section className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            Tính Giai Cấp Của YTXH
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            Sự phân hóa của tồn tại xã hội kéo theo sự phân hóa sâu sắc trong đời sống tinh thần.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.2 }}
              className="relative bg-white p-10 rounded-2xl border-2 border-soviet-red/30 shadow-xl hover:shadow-soviet-red/20 transition-all group overflow-hidden"
            >
              {/* Corner accent from image */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-soviet-orange/20 to-transparent rounded-full" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-soviet-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-soviet-orange/30">
                  <p.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-soviet-red text-center mb-4 uppercase tracking-tight">
                  {p.title}
                </h3>
                <p className="text-zinc-600 text-center leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheoryFoundation;
