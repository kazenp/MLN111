import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Hammer, SunMedium } from 'lucide-react';

const PracticalConnections = () => {
  const examples = [
    {
      icon: Hammer,
      title: 'Kinh Tế Số & Ý Thức Mới',
      desc: 'Sự phát triển của Internet, smartphone và thương mại điện tử (đời sống vật chất) đã hình thành nên thói quen mua sắm trực tuyến, ý thức về an ninh mạng và các bộ luật về giao dịch số (ý thức xã hội mới).',
      badge: 'soviet-red'
    },
    {
      icon: Shield,
      title: 'Biến Đổi Khí Hậu & Ý Thức Xanh',
      desc: 'Trước các hiện tượng thời tiết cực đoan, ô nhiễm tài nguyên (hoàn cảnh địa lý tự nhiên thay đổi thực tế), con người bắt buộc phải thay đổi tư duy, nâng cao ý thức bảo vệ môi trường và chọn tiêu dùng xanh.',
      badge: 'soviet-orange'
    },
    {
      icon: SunMedium,
      title: 'Kinh Tế Nữ Quyền & Bình Đẳng Giới',
      desc: 'Khi phụ nữ tham gia đóng vai trò tự chủ tài chính chủ đạo trong đời sống kinh tế hiện đại, các tư tưởng phong kiến như "trọng nam khinh nữ" (ý thức cũ lạc hậu) dần bị đào thải, nhường chỗ cho bình đẳng giới.',
      badge: 'soviet-gold'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6 uppercase">
            Dẫn Chứng Thực Tiễn
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            Chứng minh thực tế nhận định của Marx qua các chuyển biến trong đời sống kinh tế, xã hội và tự nhiên hiện nay.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((item, index) => {
            const Icon = item.icon;
            const badgeClass = item.badge === 'soviet-red' ? 'bg-soviet-red' : item.badge === 'soviet-orange' ? 'bg-soviet-orange' : 'bg-soviet-gold';
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-3xl border-2 border-zinc-100 shadow-xl"
              >
                <div className={`w-14 h-14 rounded-full ${badgeClass} text-white flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticalConnections;
