import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ListOrdered, ShieldCheck, ExternalLink } from 'lucide-react';

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

        {/* Section 3: AI Usage Appendix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-white border-4 border-soviet-red shadow-2xl rounded-[3rem] relative overflow-hidden text-zinc-800"
        >
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-soviet-red via-soviet-gold to-soviet-red" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-150">
            <div>
              <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tight italic flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-soviet-red" /> Phụ lục: AI Usage
              </h3>
              <p className="text-zinc-500 text-sm font-semibold mt-2">
                Minh bạch phạm vi ứng dụng AI và phân định trách nhiệm học thuật của nhóm
              </p>
            </div>

            <a
              href="https://docs.google.com/document/d/1B4As0RpUvs11iC_DbPI1il5NTaD8tEx78thSRfpB0KY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-soviet-gold text-white font-black uppercase text-xs tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-soviet-gold/20 whitespace-nowrap"
            >
              Tài liệu của nhóm <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] text-xs md:text-sm">
              <thead>
                <tr className="border-b-2 border-zinc-200 text-zinc-400 font-bold uppercase tracking-wider pb-3">
                  <th className="py-4 px-4 w-1/4">Tiêu chí</th>
                  <th className="py-4 px-4 w-5/12">Nội dung chi tiết</th>
                  <th className="py-4 px-4 w-1/3">Phân định trách nhiệm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150/50 font-medium text-zinc-700">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-5 px-4 font-black text-zinc-900">Kiểm chứng thông tin</td>
                  <td className="py-5 px-4 text-zinc-650 leading-relaxed">Mọi nội dung lý thuyết đều được đối chiếu trực tiếp từ giáo trình của giáo viên và video bài giảng trên YouTube.</td>
                  <td className="py-5 px-4 text-soviet-red font-bold leading-relaxed">Nhóm tự kiểm chứng và chịu trách nhiệm về tính chính xác của nội dung cuối cùng.</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-5 px-4 font-black text-zinc-900">Xây dựng kịch bản</td>
                  <td className="py-5 px-4 text-zinc-650 leading-relaxed">Kịch bản gốc do các thành viên trong nhóm tự lên ý tưởng. AI chỉ đóng vai trò hỗ trợ soạn thảo lại chuẩn prompt.</td>
                  <td className="py-5 px-4 text-soviet-red font-bold leading-relaxed">Nhóm biên soạn nội dung gốc; AI chỉ là công cụ hỗ trợ, không thay thế hoàn toàn.</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-5 px-4 font-black text-zinc-900">Sáng tạo &amp; Sản xuất</td>
                  <td className="py-5 px-4 text-zinc-650 leading-relaxed">Sử dụng Google Gemini để xây dựng prompt và trao đổi, giải đáp thắc mắc; Google Flow để tạo phân đoạn ảnh; Google Antigravity tạo sản phẩm web.</td>
                  <td className="py-5 px-4 text-soviet-red font-bold leading-relaxed">Khâu cắt ghép, edit video và sản phẩm cuối cùng hoàn toàn do các thành viên nhóm tự thực hiện.</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-5 px-4 font-black text-zinc-900">Cam kết liêm chính</td>
                  <td className="py-5 px-4 text-zinc-650 leading-relaxed">Nhóm cam kết AI chỉ đóng vai trò hỗ trợ (tạo ảnh, chatbot...), không thay thế công việc tư duy và biên soạn của sinh viên.</td>
                  <td className="py-5 px-4 text-soviet-red font-bold leading-relaxed">Nhóm xác nhận đã đối chiếu nguồn chính thống cho các thông tin do AI sinh ra và chịu trách nhiệm toàn bộ về sản phẩm.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresentationOverview;
