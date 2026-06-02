import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ListOrdered, BookOpen, Cpu, MessageSquare, PenTool, Terminal, Book, Activity, CheckCircle2, Clock, ShieldCheck, Search, Sparkles, FileText } from 'lucide-react';

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
  ];

  const tools = [
    { name: "Nội dung", icon: <Book className="w-6 h-6" />, color: "bg-blue-500", desc: "Tổng hợp theo đúng dàn ý tồn tại xã hội và ý thức xã hội" },
    { name: "Diễn giải", icon: <MessageSquare className="w-6 h-6" />, color: "bg-emerald-500", desc: "Biến ý chính thành nội dung dễ học, dễ nhớ" },
    { name: "Thiết kế", icon: <PenTool className="w-6 h-6" />, color: "bg-purple-500", desc: "Trình bày lại nội dung thành giao diện thuyết trình" },
    { name: "Biên tập", icon: <Terminal className="w-6 h-6" />, color: "bg-sky-500", desc: "Chỉnh sửa các section và điều hướng trong web" },
    { name: "Hệ thống hóa", icon: <Cpu className="w-6 h-6" />, color: "bg-orange-500", desc: "Tạo sơ đồ tư duy và mạch học tập liên kết" },
  ];

  const [activeTab, setActiveTab] = useState("transparency");

  const aiUsage = [
    {
      tool: "Claude 3.5 Sonnet / Gemini 1.5 Pro",
      purpose: "Hỗ trợ thiết kế khung giao diện và tối ưu hóa logic phím tắt video",
      prompt: "Hãy xây dựng component React custom trình phát video YouTube, ẩn thanh controls mặc định, nhận phím tắt 0-9 để tua thời gian và phím F để fullscreen.",
      output: "Khung sườn React hook xử lý sự kiện keydown của trình phát YouTube Iframe API.",
      modifications: "Sinh viên tự thiết kế CSS (Soviet Theme), bổ sung nút phóng to nổi tự ẩn sau 3 giây, tinh chỉnh cơ chế tua ngược Glitch 5 giây, và biên soạn kịch bản nhân vật Khánh."
    },
    {
      tool: "Claude 3.5 Sonnet / Gemini 1.5 Pro",
      purpose: "Hỗ trợ viết khung logic so khớp cho thử thách kéo thả biện chứng",
      prompt: "Tạo cấu trúc game ghép cặp đơn giản dạng matching giữa Nguyên nhân và Kết quả trong React.",
      output: "Hàm xử lý onClick so khớp ID giữa hai cột lựa chọn.",
      modifications: "Sinh viên thay đổi toàn bộ dữ liệu 4 cặp biện chứng thực tiễn hiện đại (kinh tế số, biến đổi khí hậu, bình đẳng giới, phương thức sản xuất), thiết kế hiệu ứng feedback mũi tên biện chứng, và thêm nút dẫn sang trang video."
    },
    {
      tool: "Claude 3.5 Sonnet / Gemini 1.5 Pro",
      purpose: "Hỗ trợ thiết kế hiệu ứng trượt mượt mà (smooth navigation) và cuộn trang",
      prompt: "Làm sao để khi chuyển đổi tuyến đường (Router path) trong React Router, trang web tự động cuộn lên đầu trang (top)?",
      output: "Mã nguồn component ScrollToTop lắng nghe thay đổi của hook useLocation.",
      modifications: "Sinh viên tích hợp component vào App.jsx bên trong BrowserRouter và kiểm chứng tính tương thích trên toàn bộ các trình duyệt."
    }
  ];

  const verificationSources = [
    {
      content: "Quy luật Tồn tại xã hội quyết định Ý thức xã hội",
      source: "Giáo trình Triết học Mác - Lênin, Bộ Giáo dục & Đào tạo, Chương III, Mục II.1 (Trang 182-189).",
      method: "Đối chiếu nội dung kịch bản phim tương tác (Khánh đối mặt với áp lực cơm áo gạo tiền) với định nghĩa về 'Phương thức sản xuất vật chất' và 'Điều kiện sinh hoạt vật chất'."
    },
    {
      content: "Tính độc lập tương đối của ý thức xã hội (Ý thức tác động ngược lại tồn tại)",
      source: "Giáo trình Triết học Mác - Lênin, Chương III, Mục II.2 (Trang 190-198); Văn kiện Đại hội XIII của Đảng về phát huy nhân tố con người và phát triển nguồn lực văn hóa tinh thần.",
      method: "Kiểm chứng bài học giải mã triết học (Khánh chọn Phím 9 giữ đạo đức nghề nghiệp làm tiền đề thành công) với nguyên lý ý thức xã hội vượt trước và tác động tích cực cải tạo thực tại."
    }
  ];

  const creativeApplications = [
    {
      area: "Interactive Simulation (Mô phỏng tương tác)",
      role: "AI hỗ trợ chuyển đổi mã nguồn trình phát video; Sinh viên trực tiếp biên soạn kịch bản phân nhánh phân tích biện chứng vật chất/ý thức thực tế."
    },
    {
      area: "Thử thách biện chứng (Matching Game)",
      role: "AI hỗ trợ viết cấu trúc so khớp; Sinh viên thiết kế kịch bản game ghép cặp Nguyên nhân - Kết quả hiện đại để củng cố lý luận biện chứng."
    },
    {
      area: "Làm sạch & tối ưu hóa mã nguồn",
      role: "AI hỗ trợ phân tích hiệu suất và định dạng code; Sinh viên tùy biến giao diện CSS Soviet Gold & Soviet Red hiện đại."
    }
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

        {/* Section 4: AI Usage & Academic Integrity Policy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 bg-zinc-900 text-zinc-100 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Neon gradient background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D5C75]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
            <div>
              <h3 className="text-2xl font-black flex items-center gap-3 text-soviet-gold uppercase tracking-wider">
                <ShieldCheck className="w-8 h-8 text-soviet-gold" /> Phụ lục: AI Usage &amp; Liêm chính Học thuật
              </h3>
              <p className="text-sm text-zinc-400 font-semibold mt-1">
                Minh bạch công cụ hỗ trợ – Cam kết liêm chính học thuật &amp; đối chiếu kiểm chứng nguồn tin
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-xs font-mono font-bold text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Academic Integrity: Certified</span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
            <button
              onClick={() => setActiveTab("transparency")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === "transparency"
                ? "bg-soviet-gold text-white shadow-lg shadow-soviet-gold/20"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <FileText className="w-4 h-4" /> 4.1. Minh bạch (AI Usage)
            </button>
            <button
              onClick={() => setActiveTab("responsibility")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === "responsibility"
                ? "bg-soviet-gold text-white shadow-lg shadow-soviet-gold/20"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Search className="w-4 h-4" /> 4.2. Có Trách Nhiệm &amp; Đối Chiếu
            </button>
            <button
              onClick={() => setActiveTab("creativity")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === "creativity"
                ? "bg-soviet-gold text-white shadow-lg shadow-soviet-gold/20"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Sparkles className="w-4 h-4" /> 4.3. Sáng Tạo &amp; Hỗ Trợ
            </button>
            <button
              onClick={() => setActiveTab("integrity")}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === "integrity"
                ? "bg-soviet-gold text-white shadow-lg shadow-soviet-gold/20"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <ShieldCheck className="w-4 h-4" /> 4.4. Cam kết Liêm chính
            </button>
          </div>

          {/* Tab Contents */}
          <div className="min-h-[250px]">
            <AnimatePresence mode="wait">
              {activeTab === "transparency" && (
                <motion.div
                  key="transparency"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-800 mb-6">
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4.1. Minh bạch hóa việc sử dụng AI (AI Usage Log)</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">
                      Bảng dưới đây thống kê rõ ràng từng công cụ trí tuệ nhân tạo được sử dụng, mục đích chi tiết, câu lệnh chính (Prompt), kết quả đầu ra trực tiếp của AI và phần chỉnh sửa/biên soạn thực tế của nhóm sinh viên.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider pb-3">
                          <th className="py-3 px-3">Công cụ &amp; Mục đích</th>
                          <th className="py-3 px-3">Prompt chính</th>
                          <th className="py-3 px-3">Kết quả từ AI</th>
                          <th className="py-3 px-3">Sinh viên chỉnh sửa/biên soạn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50 font-mono">
                        {aiUsage.map((item, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                            <td className="py-4 px-3 align-top whitespace-nowrap">
                              <div className="font-bold text-soviet-gold">{item.tool}</div>
                              <div className="text-[10px] text-zinc-500 mt-1 font-sans font-semibold">{item.purpose}</div>
                            </td>
                            <td className="py-4 px-3 align-top text-zinc-350 text-[11px] max-w-xs break-words bg-zinc-950/20 p-2 rounded-lg border border-zinc-800/30">
                              "{item.prompt}"
                            </td>
                            <td className="py-4 px-3 align-top text-zinc-400 text-xs font-sans max-w-xs leading-relaxed">
                              {item.output}
                            </td>
                            <td className="py-4 px-3 align-top text-emerald-400 text-xs font-sans font-semibold max-w-xs leading-relaxed">
                              {item.modifications}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "responsibility" && (
                <motion.div
                  key="responsibility"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-800">
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4.2. Có Trách Nhiệm &amp; Đối Chiếu Nguồn Chính Thống</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">
                      Toàn bộ thông tin, bài học triết học do AI gợi ý hay hỗ trợ mã nguồn đều được nhóm sinh viên chủ động đối chiếu trực tiếp với các tài liệu Lý luận Chính trị chính thống từ Bộ GD&amp;ĐT và các văn kiện chính trị của Đảng, nhà nước để loại bỏ hoàn toàn các thông tin thiếu chính xác hoặc diễn đạt sai lệch.
                    </p>
                  </div>
                  <div className="grid gap-6">
                    {verificationSources.map((item, idx) => (
                      <div key={idx} className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-6 hover:border-soviet-gold/30 transition-all">
                        <div className="flex-1">
                          <span className="px-2.5 py-1 bg-soviet-gold/15 text-soviet-gold text-[10px] font-black rounded-full uppercase tracking-wider block w-fit mb-3">Nội dung AI sinh ra / Hỗ trợ</span>
                          <h5 className="text-base font-bold text-zinc-100">{item.content}</h5>
                        </div>
                        <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6">
                          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-wider block w-fit mb-3">Nguồn Giáo trình &amp; Cách Kiểm chứng</span>
                          <p className="text-xs text-zinc-300 font-mono mb-2 leading-relaxed">{item.source}</p>
                          <p className="text-xs text-zinc-400 leading-relaxed italic">{item.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "creativity" && (
                <motion.div
                  key="creativity"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-800">
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4.3. Sáng tạo – AI Chỉ Đóng Vai Trò Hỗ Trợ</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-semibold">
                      Sản phẩm được xây dựng dựa trên sự sáng tạo độc lập của sinh viên. Trí tuệ nhân tạo hoàn toàn không thay thế con người mà chỉ đóng vai trò là một cộng tác viên lập trình và hỗ trợ format layout/hiệu ứng giao diện.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {creativeApplications.map((item, idx) => (
                      <div key={idx} className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-soviet-gold/30 transition-all">
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-soviet-gold/15 text-soviet-gold flex items-center justify-center font-bold text-xs mb-4">{idx + 1}</div>
                          <h5 className="font-bold text-zinc-200 mb-3">{item.area}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "integrity" && (
                <motion.div
                  key="integrity"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-br from-zinc-850 to-zinc-950 p-8 rounded-3xl border-2 border-soviet-gold/30 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <ShieldCheck className="w-48 h-48 text-soviet-gold" />
                    </div>
                    <span className="px-3 py-1 bg-soviet-gold/20 text-soviet-gold text-xs font-black rounded-full uppercase tracking-wider block w-fit mb-4">Cam kết của nhóm sinh viên</span>
                    <h4 className="text-2xl font-black text-white mb-4 leading-tight uppercase tracking-wide font-sans">Cam kết Liêm chính Học thuật khi ứng dụng AI</h4>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-medium italic font-serif">
                      "Chúng tôi cam kết: Toàn bộ ý tưởng cốt lõi, kịch bản phân nhánh của Khánh, hệ thống dẫn chứng thực tiễn hiện nay (Kinh tế số, Biến đổi khí hậu, Bình đẳng giới) và các nội dung phân tích biện chứng vật chất quyết định ý thức đều do nhóm sinh viên nghiên cứu, thảo luận và biên soạn trực tiếp dựa trên Giáo trình Triết học Mác - Lênin. AI chỉ được sử dụng làm công cụ hỗ trợ chuyển đổi mã nguồn và định dạng layout. Chúng tôi khẳng định không để AI làm thay hoàn toàn và hoàn toàn chịu trách nhiệm về nội dung học thuật cuối cùng hiển thị trên website này."
                    </p>

                    <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Đại diện nhóm ký tên</div>
                        <div className="font-sans italic text-base text-soviet-gold font-bold mt-1">Bùi Anh Quân, Lê Hoàng Mỹ Anh, Nguyễn Trung Nguyên, Nguyễn Đặng Ngọc Phong</div>
                      </div>
                      <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
                        <CheckCircle2 className="w-4 h-4" /> Academic Integrity Compliant
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresentationOverview;
