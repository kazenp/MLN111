import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Scale, Shield, Atom, Palette, Compass, Infinity } from 'lucide-react';

const forms = [
  {
    id: 'politics',
    icon: Landmark,
    title: 'Ý thức Chính trị',
    subtitle: 'Political Consciousness',
    desc: 'Phản ánh trực tiếp các quan hệ kinh tế - giai cấp của xã hội. Ý thức chính trị đóng vai trò chủ đạo, định hướng và chi phối các hình thái ý thức xã hội khác trong xã hội có giai cấp.',
    color: 'from-[#0D5C75]/20 to-[#0D5C75]/5',
    border: 'group-hover:border-[#0D5C75]/50',
    iconBg: 'bg-[#0D5C75]/10 text-[#0D5C75]',
  },
  {
    id: 'law',
    icon: Scale,
    title: 'Ý thức Pháp quyền',
    subtitle: 'Legal Consciousness',
    desc: 'Là toàn bộ các tư tưởng, quan điểm của một giai cấp về pháp luật, thể hiện ý chí của giai cấp thống trị được thể chế hóa thành hệ thống quy phạm pháp luật nghiêm ngặt.',
    color: 'from-amber-600/20 to-amber-600/5',
    border: 'group-hover:border-amber-600/50',
    iconBg: 'bg-amber-600/10 text-amber-600',
  },
  {
    id: 'morality',
    icon: Shield,
    title: 'Ý thức Đạo đức',
    subtitle: 'Moral Consciousness',
    desc: 'Hệ thống các quan điểm, chuẩn mực điều chỉnh hành vi ứng xử giữa người với người và giữa cá nhân với cộng đồng, hình thành qua dư luận xã hội và thói quen lịch sử.',
    color: 'from-emerald-600/20 to-emerald-600/5',
    border: 'group-hover:border-emerald-600/50',
    iconBg: 'bg-emerald-600/10 text-emerald-600',
  },
  {
    id: 'science',
    icon: Atom,
    title: 'Ý thức Khoa học',
    subtitle: 'Scientific Consciousness',
    desc: 'Hệ thống tri thức khách quan và chân thực phản ánh bản chất, quy luật của thế giới tự nhiên, xã hội và tư duy dưới dạng các khái niệm, phạm trù, định luật.',
    color: 'from-indigo-600/20 to-indigo-600/5',
    border: 'group-hover:border-indigo-600/50',
    iconBg: 'bg-indigo-600/10 text-indigo-600',
  },
  {
    id: 'aesthetics',
    icon: Palette,
    title: 'Ý thức Thẩm mỹ',
    subtitle: 'Aesthetic Consciousness',
    desc: 'Phản ánh thế giới khách quan dưới dạng hình tượng nghệ thuật nhằm thỏa mãn nhu cầu về cái đẹp, cái xấu, cái bi, cái hài; làm phong phú tinh thần con người.',
    color: 'from-rose-600/20 to-rose-600/5',
    border: 'group-hover:border-rose-600/50',
    iconBg: 'bg-rose-600/10 text-rose-600',
  },
  {
    id: 'religion',
    icon: Compass,
    title: 'Ý thức Tôn giáo',
    subtitle: 'Religious Consciousness',
    desc: 'Là sự phản ánh hư ảo, hoang đường thực tại khách quan vào đầu óc con người, dựa trên niềm tin tuyệt đối vào sức mạnh siêu nhiên cai quản thế giới.',
    color: 'from-purple-600/20 to-purple-600/5',
    border: 'group-hover:border-purple-600/50',
    iconBg: 'bg-purple-600/10 text-purple-600',
  },
  {
    id: 'philosophy',
    icon: Infinity,
    title: 'Ý thức Triết học',
    subtitle: 'Philosophical Consciousness',
    desc: 'Hình thái ý thức xã hội cao nhất và có tính trừu tượng hóa khái quát hóa cao nhất, cung cấp nhân sinh quan, thế giới quan và phương pháp luận chung nhất để nhận thức và cải tạo thế giới.',
    color: 'from-sky-600/20 to-sky-600/5',
    border: 'group-hover:border-sky-600/50',
    iconBg: 'bg-sky-600/10 text-sky-600',
    isSpecial: true,
  }
];

const SocialConsciousnessForms = () => {
  return (
    <section id="forms" className="py-24 px-6 bg-white border-y border-zinc-100 relative overflow-hidden">
      {/* Abstract geometric background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-zinc-50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#0D5C75]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-[#0D5C75]/10 text-[#0D5C75] text-xs font-black rounded-full uppercase tracking-widest mb-4">
            Hình thái Ý thức Xã hội
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0D5C75] mb-6 uppercase tracking-tighter italic">
            Các Hình Thái Ý Thức Xã Hội
          </h2>
          <div className="h-2 w-24 bg-amber-600 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-zinc-500 max-w-3xl mx-auto font-medium">
            Đời sống tinh thần phong phú của xã hội được thể hiện qua các hình thái ý thức khác nhau, mỗi hình thái phản ánh một góc độ riêng biệt của tồn tại xã hội.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.filter(f => !f.isSpecial).map((form, index) => {
            const Icon = form.icon;
            return (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative bg-zinc-50 hover:bg-white border-2 border-transparent hover:border-zinc-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${form.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${form.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-800 mb-1 tracking-tight group-hover:text-[#0D5C75] transition-colors">
                    {form.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-4">
                    {form.subtitle}
                  </span>
                  <p className="text-zinc-600 text-sm font-semibold leading-relaxed">
                    {form.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Highlighted special form (Philosophy) spanning full width on lg screens */}
          {forms.filter(f => f.isSpecial).map((form) => {
            const Icon = form.icon;
            return (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-zinc-950 border-2 border-zinc-800 lg:col-span-3 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-[0_20px_50px_rgba(13,92,117,0.15)] hover:border-[#0D5C75]/40 transition-all duration-500 overflow-hidden"
              >
                {/* Custom gradient flow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D5C75]/10 via-transparent to-amber-600/10 pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl ${form.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tight">
                          {form.title}
                        </h3>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block">
                          {form.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-base font-semibold leading-relaxed">
                      {form.desc}
                    </p>
                  </div>
                  
                  <div className="w-full lg:w-auto flex-shrink-0 flex items-center justify-center lg:justify-end">
                    <div className="px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-inner">
                      <span className="text-amber-500 text-xs font-black uppercase tracking-widest block mb-1">Cấp độ Lý luận</span>
                      <span className="text-white text-lg font-black uppercase tracking-tight">Cao Nhất &amp; Khái Quát Nhất</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialConsciousnessForms;
