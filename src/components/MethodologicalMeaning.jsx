import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

const meanings = [
  {
    title: "Cải tạo tồn tại xã hội trước tiên",
    desc: "Muốn thay đổi ý thức xã hội (tư tưởng lạc hậu, tập quán cũ) phải bắt đầu từ cải tạo tồn tại xã hội (đời sống vật chất, phát triển lực lượng sản xuất), tránh tuyên truyền suông.",
  },
  {
    title: "Phát huy vai trò lý luận cách mạng",
    desc: "Cần chủ động xây dựng ý thức xã hội mới tiến bộ, nâng cao dân trí, phát triển khoa học công nghệ, giáo dục tư tưởng để thúc đẩy tồn tại xã hội tiến lên.",
  },
  {
    title: "Tránh phiến diện, giáo điều",
    desc: "Khắc phục hai sai lầm: tuyệt đối hóa tồn tại xã hội (chủ nghĩa duy vật tầm thường, thụ động) hoặc tuyệt đối hóa ý thức xã hội (chủ nghĩa duy tâm chủ quan).",
  },
];

const MethodologicalMeaning = () => {
  return (
    <section className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-8 uppercase tracking-tighter">
              Ý Nghĩa Phương Pháp Luận
            </h2>
            <div className="h-2 w-24 bg-soviet-gold mb-8 shadow-sm" />
            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
              Từ nhận định của Karl Marx, chúng ta rút ra các bài học chỉ đạo thực tiễn sâu sắc cho việc nhận thức xã hội và cải tạo thế giới.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            {meanings.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 items-start p-8 rounded-2xl bg-white border-2 border-soviet-red/10 hover:border-soviet-red/40 shadow-xl transition-all"
              >
                <div className="bg-soviet-red/5 p-3 rounded-xl shadow-inner">
                  <CircleCheck className="w-8 h-8 text-soviet-red shrink-0" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-tight">{m.title}</h4>
                  <p className="text-zinc-500 leading-relaxed font-medium">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologicalMeaning;
