import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ListOrdered } from 'lucide-react';

const PresentationOverview = () => {
  const members = [
    { name: "Bùi Anh Quân", id: "SE193721" },
    { name: "Lê Hoàng Mỹ Anh", id: "SE193767" },
    { name: "Nguyễn Trung Nguyên", id: "SE194189" },
    { name: "Nguyễn Đặng Ngọc Phong", id: "SE193702" },
  ];

  const outline = [
    { title: "Lý thuyết cốt lõi", desc: "Khái niệm Tồn tại xã hội (đời sống vật chất) và Ý thức xã hội (đời sống tinh thần) trong Chương III.", path: "/#theory" },
    { title: "Quyết định biện chứng", desc: "Phân tích vì sao tồn tại xã hội quyết định ý thức xã hội: Đời sống thế nào thì ý thức thế ấy.", path: "/#dialectics" },
    { title: "Tính độc lập tương đối", desc: "Sự kế thừa, lạc hậu hay vượt trước của ý thức xã hội so với đời sống vật chất thực tiễn.", path: "/#connections" },
    { title: "Liên hệ thực tiễn hiện nay", desc: "3 dẫn chứng lớn chứng minh nhận định của Marx: Kinh tế số, Biến đổi khí hậu, và Bình đẳng giới.", path: "/#cases" },
    { title: "Bài học & Thử thách tương tác", desc: "Ý nghĩa phương pháp luận cải tạo đời sống tinh thần và phần thử thách củng cố kiến thức.", path: "/#methodology" },
    { title: "Các hình thái ý thức xã hội", desc: "7 hình thái ý thức xã hội phản ánh các góc độ của đời sống thực tiễn từ chính trị đến triết học.", path: "/#forms" },
  ];

  return (
    <section id="overview" className="min-h-screen py-32 px-6 bg-zinc-50 text-zinc-800 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.05)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-soviet-red/10 text-soviet-red font-bold text-sm uppercase tracking-widest mb-4">
            Môn học: MLN111
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic text-soviet-red">
            Tổng quan <span className="text-zinc-800">Bài học</span>
          </h2>
          <p className="text-xl font-medium text-zinc-500 mb-8">
            Chủ đề: <span className="text-zinc-900 font-bold underline decoration-soviet-red underline-offset-4">Không phải ý thức quyết định đời sống mà chính đời sống quyết định ý thức</span>
          </p>
          <div className="w-24 h-2 bg-soviet-red mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Section 1: Team Members */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold flex items-center gap-4 uppercase tracking-widest text-soviet-red">
              <Users className="w-8 h-8" /> Thành viên thực hiện
            </h3>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-6 bg-white border-2 border-zinc-100 border-l-soviet-red hover:border-soviet-red transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
                >
                  <div className="text-xl font-bold text-zinc-900 group-hover:text-soviet-red transition-colors">{member.name}</div>
                  <div className="text-soviet-red font-mono font-bold tracking-tighter text-lg">{member.id}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 2: Outline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold flex items-center gap-4 uppercase tracking-widest text-soviet-red">
              <ListOrdered className="w-8 h-8" /> Nội dung bài học
            </h3>
            <div className="space-y-6">
              {outline.map((item, index) => (
                <div key={index} className="flex gap-6 relative group">
                  <div className="flex-none w-12 h-12 rounded-full bg-soviet-red text-white flex items-center justify-center text-xl font-black italic shadow-lg shadow-soviet-red/20 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  {index !== outline.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-zinc-200" />
                  )}
                  <Link to={item.path} className="pb-8 block flex-1 group-hover:translate-x-2 transition-transform">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-soviet-orange transition-colors uppercase text-zinc-800">{item.title}</h4>
                    <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PresentationOverview;
